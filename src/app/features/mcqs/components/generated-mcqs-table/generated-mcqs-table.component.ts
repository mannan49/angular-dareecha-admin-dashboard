import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';

import { McqItem } from '@models/shared/mcq-item.model';
import { McqOption } from '@models/shared/mcq-option.model';

@Component({
  selector: 'app-generated-mcqs-table',
  standalone: false,
  templateUrl: './generated-mcqs-table.component.html',
  styleUrl: './generated-mcqs-table.component.css',
})
export class GeneratedMcqsTableComponent {
  @Input() mcqs: McqItem[];
  @Output() allMcqsDeleted =  new EventEmitter<void>();
  @Output() submitButtonClicked =  new EventEmitter<McqItem[]>();

  mcqsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.mcqsForm = this.formBuilder.group({
      mcqsData: this.formBuilder.array(this.mcqs.map(mcq => this.createMcqGroup(mcq))),
    });
  }

  get mcqsData(): FormArray {
    return this.mcqsForm.get('mcqsData') as FormArray;
  }

  createMcqGroup(mcq: McqItem): FormGroup {
    return this.formBuilder.group({
      Statement: [mcq.Statement, Validators.required],
      Options: this.formBuilder.array(mcq.Options.map(opt => this.createOptionGroup(opt))),
      CorrectOption: [String.Empty, Validators.required]
    });
  }

  createOptionGroup(option: McqOption): FormGroup {
    return this.formBuilder.group({
      OptionId: [option?.OptionId],
      Text: [option?.Text, Validators.required],
      Media: null
    });
  }

  getOptionsArray(mcqIndex: number): FormArray {
    return this.mcqsData.at(mcqIndex).get('Options') as FormArray;
  }

  onDeleteMcqButtonClick(index: number) {
    this.mcqsData.removeAt(index);
    this.mcqs = this.mcqs.filter((_, i) => i !== index);
    if(this.mcqs?.length === 0){
      this.allMcqsDeleted.emit();
    }
  }

  onSubmit() {
    this.submitButtonClicked.emit(this.mcqsForm.value.mcqsData);
  }

  isCorrectOption(mcq: McqItem, option: McqOption): boolean {
    return false;
  }
}
