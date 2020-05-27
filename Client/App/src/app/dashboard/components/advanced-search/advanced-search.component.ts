import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl } from '@angular/forms';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  private form: FormGroup;
  public advancedFormGroup: FormGroup;

  constructor(private parent: FormGroupDirective) { }

  ngOnInit() {
    this.form = this.parent.form;
    const artist = new FormControl(null);
    const genre = new FormControl(null);
    const album = new FormControl(null);
    const writers = new FormControl(null);
    const producers = new FormControl(null);
    this.advancedFormGroup = new FormGroup({artist, genre, album, writers, producers});
    this.form.addControl('advancedSearch', this.advancedFormGroup);
  }

}
