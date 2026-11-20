import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Asset } from '../../../core/models/asset.interface';
import { AssetsService } from '../../../core/services/asset/asset.interface';
import { ProjectsService } from '../../../core/services/projects-service';
import { Project } from '../../../core/models/project.interface';

@Component({
  selector: 'app-asset-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './asset-list.html',
  styleUrl: './asset-list.css'
})
export class AssetList implements OnInit {

  assets=signal<Asset[]>([]);

  searchText = '';
  selectedStatus = 'All';
  selectedDeviceType = 'All';
  selectedProject = 'All';
  projects=signal< Project[]>([]);

  constructor(
    private assetsService: AssetsService,
    private projectsService: ProjectsService
  ) {
  }

  ngOnInit(): void {
    this.loadAssets();
    this.loadProjects();
  }

  loadProjects(): void {
  this.projectsService.getProjects().subscribe({
    next: (projects) => this.projects.set(projects),
    error: (err) => console.error('Failed to load projects in asset-list', err)
  });
}

  loadAssets(): void {
    this.assetsService.getAssets().subscribe({
      next: assets => {
        console.log('>>> Assets received from backend:', assets);
        this.assets.set(assets)},
      error: error => console.error('Failed to load assets:', error)
    });
  }

  get filteredAssets(): Asset[] {

  const search = this.searchText
    .toLowerCase()
    .trim();

  const allAssets = this.assets();  

  return allAssets.filter(asset => {

    const matchesSearch = [
      asset.assetTag,
      asset.companyName,
      asset.deviceType,
      asset.assignedTo ?? '',
      asset.project ?? ''
    ].some(value => value?value.toLowerCase().includes(search) : false);

    const matchesStatus =
      this.selectedStatus === 'All' ||
      asset.status === this.selectedStatus;

    const matchesDeviceType =
      this.selectedDeviceType === 'All' ||
      asset.deviceType === this.selectedDeviceType;

    const matchesProject =
      this.selectedProject === 'All' ||
      (this.selectedProject === 'Unassigned'
        ? !asset.project
        : asset.project === this.selectedProject);

    return matchesSearch && matchesStatus && matchesDeviceType && matchesProject;
  });
}

}