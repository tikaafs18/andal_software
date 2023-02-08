import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { JobTitle } from '../models/job-title';
import { JobTitleService } from '../services/job-title.service';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit {
  @Input() title?: JobTitle;
  @Output() titlesUpdated = new EventEmitter<JobTitle[]>();
  jobTitle: JobTitle[] = [];
  jobTitleObj: JobTitle = new JobTitle();
  editJobTitle: JobTitle = new JobTitle();

  constructor(private jobTitleService: JobTitleService) { }

  ngOnInit(): void {
    this.jobTitle = [];
    this.editJobTitle = new JobTitle();
    this.jobTitleObj = new JobTitle();
    this.get();
  }

  @ViewChild('gridContainer') gridContainer!: DxDataGridComponent;

  get() {
    this.jobTitleService.getJobTitle().subscribe((result: JobTitle[]) => (result.map(val => {
      if (!val.isDeleted) this.jobTitle.push(val)
    })));
  }

  save(e: any) {
    this.gridContainer.instance.saveEditData();
    this.jobTitleService
      .createTitle(e)
      .subscribe(res => {
        this.ngOnInit();
        alert('Add job title success');
      }, err => {
        alert(err);
      })
  }

  cancel() {
    this.gridContainer.instance.cancelEditData();
  }

  edit() {
    this.jobTitleObj.title_code = this.editJobTitle.title_code;
    this.jobTitleObj.title_name = this.editJobTitle.title_name;
    this.jobTitleService
      .updateTitle(this.jobTitleObj)
      .subscribe(res => {
        this.ngOnInit();
        alert('Edit job title success');
      }, err => {
        alert("Failed to update job title");
      });
  }

  delete(e: any) {
    this.jobTitleService
      .deleteTitle(e)
      .subscribe(res => {
        this.ngOnInit();
        alert('Delete job title success');
      }, err => {
        console.log(err)
        alert("Failed to delete job title");
      });
  }

  addRow() {
    this.gridContainer.instance.addRow();
  }

  call(etask: any) {
    this.jobTitleObj = etask;
    this.editJobTitle = etask;
  }

}
