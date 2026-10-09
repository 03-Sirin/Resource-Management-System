import { Component, OnInit } from '@angular/core';
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

  assets: Asset[] = [];

  searchText = '';
  selectedStatus = 'All';
  selectedDeviceType = 'All';
  selectedProject = 'All';
  projects: Project[] = [];
  projectLoadError = '';

  constructor(
    private assetsService: AssetsService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.loadAssets();
    this.projectsService.getProjects().subscribe({
      next: projects => this.projects = projects,
      error: error => {
        console.error('Failed to load projects for asset filters:', error);
        this.projectLoadError = 'Project filter options could not be loaded.';
      }
    });
  }

  loadAssets(): void {
    this.assetsService.getAssets().subscribe({
      next: assets => this.assets = assets,
      error: error => console.error('Failed to load assets:', error)
    });
  }

  get filteredAssets(): Asset[] {

  const search = this.searchText
    .toLowerCase()
    .trim();

  return this.assets.filter(asset => {

    const matchesSearch = [
      asset.assetTag,
      asset.companyName,
      asset.deviceType,
      asset.assignedTo ?? '',
      asset.project ?? ''
    ].some(value => value.toLowerCase().includes(search));

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