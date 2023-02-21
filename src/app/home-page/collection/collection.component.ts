import { Component } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent {
  data = [
    {
      src: 'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940884/categorybanner_1_img_mojye8.webp',
      title: 'Bộ sưu tập',
      headerText: 'Nendoroid',
      contentText:
        'Dòng chibi figure được yêu thích nhất, nhiều gương mặt, thoả sức tạo dáng',
      slug: 'chibi-figure',
    },
    {
      src: 'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940885/categorybanner_2_img_vpthdg.webp',
      title: 'Bộ sưu tập',
      headerText: 'Pop Up Parade',
      contentText: 'Dòng scale figure kích thước sinh viên, giá tiểu học',
      slug: 'pop-up-figure',
    },
  ];
  faAngleRight = faAngleRight;
}
