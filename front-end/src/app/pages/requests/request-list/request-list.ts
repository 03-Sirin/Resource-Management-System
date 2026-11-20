import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ResourceRequest } from '../../../core/models/resource-request.interface';
import { ResourceRequestsService } from '../../../core/services/resource/resource-requests.service';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-request-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './request-list.html',
  styleUrl: './request-list.css'
})
export class RequestList implements OnInit {
  private readonly requestService = inject(ResourceRequestsService);
  readonly authService = inject(AuthService);

  requests = signal<ResourceRequest[]>([]);
  isLoading = signal(true);
  searchText = '';
  selectedStatus = 'All';

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.isLoading.set(true);
    this.requestService.getRequests().subscribe({
      next: (data) => {
        this.requests.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load requests:', err);
        this.isLoading.set(false);
      }
    });
  }

  get filteredRequests(): ResourceRequest[] {
    const search = this.searchText.toLowerCase().trim();
    const all = this.requests();

    return all.filter(r => {
      const matchesSearch = !search || [
        r.requestNumber,
        r.requesterName,
        r.projectName,
        r.deviceType,
        r.reason
      ].some(val => val ? val.toLowerCase().includes(search) : false);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        r.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  cancelRequest(id: number): void {
    if (!confirm('Are you sure you want to cancel this request?')) return;

    this.requestService.updateStatus(id, { status: 'CANCELLED' }).subscribe({
      next: () => this.loadRequests(),
      error: (err) => alert('Failed to cancel request: ' + (err.error?.message || err.message))
    });
  }

  approveRequest(id: number): void {
    this.requestService.updateStatus(id, { status: 'APPROVED' }).subscribe({
      next: () => this.loadRequests(),
      error: (err) => alert('Failed to approve request: ' + (err.error?.message || err.message))
    });
  }

  rejectRequest(id: number): void {
    const reason = prompt('Please enter a rejection reason:');
    if (reason === null) return;

    this.requestService.updateStatus(id, { status: 'REJECTED', adminComments: reason }).subscribe({
      next: () => this.loadRequests(),
      error: (err) => alert('Failed to reject request: ' + (err.error?.message || err.message))
    });
  }
}