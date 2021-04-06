import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-postuler',
  templateUrl: './modal-postuler.component.html',
  styleUrls: ['./modal-postuler.component.scss']
})
export class ModalPostulerComponent implements OnInit {
  @Input() titre: any;
  @Input() motivation: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

}
