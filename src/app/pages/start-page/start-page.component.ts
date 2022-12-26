import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { MainState } from '../../main.reducer';
import { createBoard } from '../../store/game/game.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MainState>,
    private router: Router
  ) {}

  public gameForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  private createForm = () =>
    (this.gameForm = this.formBuilder.group({
      size: new FormControl(4, [
        Validators.required,
        Validators.min(4),
        Validators.max(8),
      ]),
      arrows: new FormControl(4, [Validators.min(1)]),
      pits: new FormControl(2, [Validators.min(1)]),
    }));

  get size() {
    return this.gameForm.value.size;
  }

  get arrows() {
    return this.gameForm.value.arrows;
  }
  get pits() {
    return this.gameForm.value.pits;
  }

  startGame() {
    this.store.dispatch(createBoard({ rows: this.size, cols: this.size, arrows: this.arrows, pits: this.pits }));
    this.router.navigate(['/game']);
  }
}
