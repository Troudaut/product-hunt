import { Component, EventEmitter, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

const MS_IN_MINUTES = 60_000;

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {

  @Output() changeDateEvent = new EventEmitter<string>();

  onChangedDate(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    console.log(date, date?.toLocaleDateString());
    if (date) {
      this.changeDateEvent.emit(this.formatString(date));
    }
  }

  formatString(date: Date): string {
    const timezoneOffset = date.getTimezoneOffset() * MS_IN_MINUTES;
    const dateWithoutTimeZone = new Date(date.getTime() - timezoneOffset);
    return dateWithoutTimeZone.toISOString().split('T')[0];
  }

}
