import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IconDefinition, faChevronDown, faChevronUp, faPlus, faClockRotateLeft, faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { Marker } from 'src/app/models/marker';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-monument',
  templateUrl: './monument.component.html',
  styleUrls: ['./monument.component.scss']
})
export class MonumentComponent implements OnChanges {
  @Input() marker: Marker | undefined
  @Input() question: Question | undefined

  @Output() nextQuestion: EventEmitter<any> = new EventEmitter();
  @Output() sendAnswer: EventEmitter<any> = new EventEmitter();

  faChevronDown: IconDefinition = faChevronDown
  faChevronUp: IconDefinition = faChevronUp
  faPlus: IconDefinition = faPlus
  faClock: IconDefinition = faClockRotateLeft
  faDistance: IconDefinition = faArrowsLeftRight

  maximize: boolean = true

  ngOnChanges(changes: SimpleChanges) {}

  setAnswer() {
    this.maximize = true
    this.sendAnswer.emit()
  }

  continue() {
    this.nextQuestion.emit()
  }
}
