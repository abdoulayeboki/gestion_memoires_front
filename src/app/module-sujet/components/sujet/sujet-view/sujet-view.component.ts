import { Component, OnInit } from '@angular/core';
import { SujetService } from '../../../services/sujet.service';
import { Sujet } from '../../../models/sujet';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { Personnel } from '../../../../administration/models/personnel';
import { concatMap, concatMapTo, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPostulerComponent } from '../../postuler/modal-postuler/modal-postuler.component';
import { PostulerService } from '../../../services/postuler.service';
import { Postuler } from '../../../models/postuler';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-sujet-view',
  templateUrl: './sujet-view.component.html',
  styleUrls: ['./sujet-view.component.scss']
})
export class SujetViewComponent implements OnInit {
  idSujet: number = 0;
  sujet?: Sujet;
  personnel?: Personnel;
  personnelPostuler: any;
  personnelAccorder: any;
  p:number=1;
  accorde: boolean = false
  sujetValide: boolean = false;
  constructor(
    private sujetService: SujetService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private modalService: NgbModal,
    private postulerService:PostulerService,
  ) {
    
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {this.idSujet = param['id']})
    this.getData()
   // recuperons le personnel actuellement connecte
   this.authService.userObservable.pipe(
    concatMap(user => this.authService.getUserById(user.id) )
   ).subscribe(user => { this.personnel = user.personnel; })
  }
  getData() {
    this.sujetService.getSujet(this.idSujet)
      .subscribe(sujet => {
        this.sujet = sujet
        if (sujet.etatSujet == "VALIDE")
          this.sujetValide = true;
        this.personnelPostuler = []
        this.personnelAccorder =[]
        // verification si la personne à été accorde pour ajoute un attribut accorde sur l'objet personnel
        for (let p of sujet.personnelPostuler){
          this.postulerService.getAccorderBySujetAndPersonnel(this.sujet?.id, p.id).subscribe(
            (postuler: Postuler[]) => {
              if (postuler.length > 0)
                p.accorde = true;
              else p.accorde = false

              // if (!(p.nbr_sujet_valide > 0 && p.profil == "ETUDIANT"))
              this.personnelPostuler.push(p)
            }
          );
        }
        this.personnelPostuler.filter((p:any) => p.nbr_sujet_valide>0)
      });
  }



  deleteSujet() {
    if(confirm("etes vs sur de vouloir supprimer ce sujet"))
    this.sujetService.deleteSujet(this.sujet)
      .subscribe(sujet => {
        alert("deleting success");
        this.router.navigate(['sujets'])
      });
  }

  onCancel() {
    this.router.navigate(['sujets'])
  }
  // owner permet de verifier si la personne est proprietaire du sujet pour pouvoir modifie ou non
  owner(sujet: Sujet): Boolean{
    if (this.personnel?.id==sujet.personnel?.id && ( sujet.etatSujet=="PROPOSE" || sujet.etatSujet=="ACCORDE") )
      return true
    else return false
  }


  // pour voir si la personne peut postuler
  peutPostuler(sujet: Sujet): Boolean {
    if (this.personnel?.profil == "ETUDIANT" && this.personnel.nbr_sujet_valide>0)
      return false
    
    if (sujet.personnel.profil == this.personnel?.profil)
      return false
    else if (sujet.personnel.profil==="AUTRE"  && this.personnel?.profil==="ENSEIGNANT")
      return false
    else if (sujet.personnel.profil === "ENSEIGNANT" && this.personnel?.profil === "AUTRE")
      return false
    else
      return true
  }
  // ouvrir le modal pour voir la motivation de la personne
  openMotivation(personnel:Personnel) {
    this.postulerService.getPostulerBySujetAndPersonnel(this.sujet?.id, personnel.id).subscribe(
      (postuler: Postuler[]) => {
        console.log(postuler)
        const modalRef = this.modalService.open(ModalPostulerComponent);
        modalRef.componentInstance.titre = "Motivation";
        modalRef.componentInstance.motivation = postuler[0].motivation;
     }
    )   
  }

  openCv(personnel:Personnel) {
    this.postulerService.getPostulerBySujetAndPersonnel(this.sujet?.id, personnel.id).subscribe(
      (postuler: Postuler[]) => {
        console.log(postuler)
        const modalRef = this.modalService.open(ModalPostulerComponent);
        modalRef.componentInstance.titre = "CV";
        modalRef.componentInstance.motivation = postuler[0].cv;
     }
    )   
  }

  accorderSujet(personnel: Personnel) {
    if (!personnel.accorde) {
    if(confirm("Etes vous sûr de lui accorde ce sujet"))
    this.postulerService.postAccorderSujets(this.sujet?.id, personnel.id).subscribe(
      () => {
        // this.ngOnInit()
        alert("Success: le sujet à bien été accordé")
        window.location.reload();
      },
      error =>alert("Erreur: ce sujet a été dèjà accordé")
    )
    } else {
      if (confirm("Etes vous sûr d'annuler"))
        this.postulerService.getAccorderBySujetAndPersonnel(this.sujet?.id, personnel.id).pipe(
        ).subscribe(
          (postuler: Postuler[]) => {
            this.postulerService.deleteAccorderSujets(postuler[0]).subscribe(
              () => {
                // this.ngOnInit();
                alert("Success: accord annulé")
                window.location.reload();
              }
            )
        }
      )
    }
    
    
  }
}
