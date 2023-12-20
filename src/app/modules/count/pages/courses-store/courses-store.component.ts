import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Course } from 'src/app/core/models/course.model';
import { Module } from 'src/app/core/models/module.model';
import { CountService } from '../../services/count.service';
import { SharingDataService } from 'src/app/sharing-services/sharing-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalCourseDetailComponent } from 'src/app/modules/shared-utils/modal-course-detail/modal-course-detail.component';

@Component({
  selector: 'app-courses-store',
  templateUrl: './courses-store.component.html',
  styleUrls: ['./courses-store.component.scss'],
})
export class CoursesStoreComponent implements OnInit {
  token: any;
  userData: any;
  filterForm: FormGroup = new FormGroup({});
  courses: Course[] = [];
  currentCourse: Course = {
    id: 0,
    name: '',
    image: '',
    course_type: '',
    substantive_function: '',
    hours_num: 0,
    value: 0,
  };

  modules: Module[] = [
    {
      id: 1,
      id_course: 1,
      name: 'Primer modulo',
      urls_video: [
        'https://www.youtube.com/embed/Z5MoBm99w1Q',
        'https://www.youtube.com/embed/fOkuDuABAVI',
      ],
      url_infograph:
        'https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1200x675.jpg',
      url_pdf: '../../../assets/docs/Programa de voluntarios.pdf',
    },
    {
      id: 2,
      id_course: 1,
      name: 'Segundo modulo',
      urls_video: [
        'https://www.youtube.com/embed/Z5MoBm99w1Q',
        'https://www.youtube.com/embed/fOkuDuABAVI',
      ],
      url_infograph:
        'https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1200x675.jpg',
      url_pdf: '../../../assets/docs/Programa de voluntarios.pdf',
    },
    {
      id: 3,
      id_course: 1,
      name: 'Tercer modulo',
      urls_video: ['https://www.youtube.com/embed/Z5MoBm99w1Q'],
      url_infograph:
        'https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1200x675.jpg',
      url_pdf: '../../../assets/docs/Programa de voluntarios.pdf',
    },
    {
      id: 4,
      id_course: 1,
      name: 'Cuarto modulo',
      urls_video: ['https://www.youtube.com/embed/Z5MoBm99w1Q'],
      url_infograph:
        'https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1200x675.jpg',
      url_pdf: '../../../assets/docs/Programa de voluntarios.pdf',
    },
  ];

  constructor(
    private countService: CountService,
    private sharingService: SharingDataService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = this.sharingService.decodeToken(this.token);
    this.countService.getAllCourses().subscribe((data) => {
      for (let i = 0; i < data.info.length; i++) {
        this.currentCourse = {
          id: data.info[i].course_id,
          image: data.info[i].url_image,
          name: data.info[i].name,
          course_type: data.info[i].course_type,
          substantive_function: data.info[i].substantive_function,
          hours_num: data.info[i].hours_number,
          value: data.info[i].value,
        };
        this.courses.push(this.currentCourse);
      }
    });
    this.filterForm = new FormGroup({
      coursesType: new FormControl('Todos'),
    });
  }

  get coursesType() {
    return this.filterForm.get('coursesType')?.value;
  }

  getListCourses(type: string): Course[] {
    let courses: Course[] = [];
    for (let i = 0; i < this.courses.length; i++) {
      if (
        this.courses[i].course_type === type.toLocaleLowerCase() ||
        type === 'Todos'
      ) {
        courses.push(this.courses[i]);
      }
    }
    return courses;
  }

  getModuleNamesList(course_id: number) {
    let modulesName: string[] = [];
    for (let i = 0; i < this.modules.length; i++) {
      if (this.modules[i].id_course === course_id) {
        modulesName.push(this.modules[i].name);
      }
    }
    return modulesName;
  }

  showMoreCourseInfo(course_id: number) {
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].id === course_id) {
        this.currentCourse = this.courses[i];
        this.openDialog();
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalCourseDetailComponent, {
      data: {
        course: this.currentCourse,
        modules: this.getModuleNamesList(this.currentCourse.id),
        redirectTo: '/my-count/my-courses/payment',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
