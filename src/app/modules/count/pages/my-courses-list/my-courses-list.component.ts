import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Course } from 'src/app/core/models/course.model';
import { CountService } from '../../services/count.service';
import { SharingDataService } from 'src/app/sharing-services/sharing-data.service';

@Component({
  selector: 'app-my-courses-list',
  templateUrl: './my-courses-list.component.html',
  styleUrls: ['./my-courses-list.component.scss'],
})
export class MyCoursesListComponent implements OnInit {
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

  constructor(
    private countService: CountService,
    private sharingService: SharingDataService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = this.sharingService.decodeToken(this.token);
    this.countService
      .getCoursesByStudentList(this.userData.user.user_id)
      .subscribe((data) => {
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
}
