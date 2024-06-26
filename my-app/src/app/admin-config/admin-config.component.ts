import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.css']
})
export class AdminConfigComponent implements OnInit {
  configForm: FormGroup = new FormGroup({});
  groups: any[] = [];

  constructor(private fb: FormBuilder, private groupService: GroupService) { }

  ngOnInit(): void {
    this.configForm = this.fb.group({
      userCount: [null, [Validators.required, Validators.min(1)]],
      groupCount: [null, [Validators.required, Validators.min(1)]],
      lastGroupConfig: ['LAST_MIN']
    });
  }

  onSubmit(): void {
    if (this.configForm.valid) {
      const userCount = this.configForm.value.userCount;
      const groupCount = this.configForm.value.groupCount;
      const lastGroupConfig = this.configForm.value.lastGroupConfig;

      this.groupService.createGroups(userCount, groupCount, lastGroupConfig);
      this.groups = this.groupService.getGroups();
    }
  }
}
