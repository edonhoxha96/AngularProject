import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  image:any = null;
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';

  constructor(private uploadService: UploadFileService) {
  }

  ngOnInit(): void {
    // this.uploadService.getImage("3EBmDC.jpg").subscribe(
    //   (res: Blob) => {
    //     let reader = new FileReader()
    //     this.image = reader.readAsDataURL(res);
    //   },
    //   (err => console.log(err))
    // )
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile, 'test2').subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log(Math.round(100 * event.loaded / event.total));

            } else if (event instanceof HttpResponse) {
              this.message = "Image uploaded successfully";
            }
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.message) {
              this.errorMsg = err.error.message;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

  getImage():any{
    this.uploadService.getImage("3EBmDC.jpg").subscribe(
      (res: Blob) => {
        let reader = new FileReader()
        this.image = reader.readAsDataURL(res);
        return this.image
      },
      (err => console.log(err))
    )
  }
}
