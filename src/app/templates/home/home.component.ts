import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';

// Create an object to serialize JSON data to when retrieving images from back end
interface Image {
  image: File;
  imageURL: any;
  name: string;
  image_classification: string;
  region: string;
  lesion_id: string;
  description: string;
}

interface ImageList {
  results: Image[];
}

interface Lesion {
  lesion_id: string;
  description: string;
}

interface ImageV2 {
  imageURL: any;
  name: string;
  image_classification: string;
  date_uploaded: string;
  date_display: Date;
}

interface LesionV2 {
  lesion_id: string;
  description: string;
  images: ImageV2[];
}

interface RegionV2 {
  region: string;
  lesions: LesionV2[]
}

interface ImageListV2 {
  results: RegionV2[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageUrl: any;
  existingImage: Boolean;
  newImage: Boolean;
  gettingImages: Boolean;
  uploadPending: Boolean;
  uploadCompleted: Boolean;
  uploadSuccess: Boolean;
  classification: string;

  images: Image[];
  regions: RegionV2[];
  lesions: Lesion[];
  home: Boolean;
  upload: Boolean;
  view: Boolean;
  numCols: number;

  form: FormGroup;

  constructor(private _authService: AuthService,
              private _imageService: ImageService,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Enable the home view by setting corresponding booleans
    this.home = true;
    this.upload = false;
    this.view = false;
    this.numCols = 5;
    this.gettingImages = true;
  }

  homePage() {
    // Enable the correct view by setting corresponding booleans
    this.home = true;
    this.upload = false;
    this.view = false;
  }

  uploadPage() {
    // Enable the correct view by setting corresponding booleans
    // Initialize booleans for uploading progress and initialize image preview url to null
    this.home = false;
    this.upload = true;
    this.view = false;
    this.classification = '';
    this.existingImage = false;
    this.newImage = false;
    this.uploadPending = false;
    this.uploadCompleted = false;
    this.uploadSuccess = false;
    this.imageUrl = null;

    // Create a form of required fields
    this.form = this._formBuilder.group({
        image: new FormControl('', [Validators.required]),
        region: new FormControl('', [Validators.required]),
        lesion: new FormControl('', null),
        newLesion: new FormControl('', null),
        existingLesion: new FormControl('', null),
        //lesion_id: new FormControl('', [Validators.required]),
        description: new FormControl('', null),
    });

    // Watch the image upload input. If a new image is selected, show a preview on screen
    this.form.get('image').valueChanges.subscribe(data => {
      if (this.form.get('image').value != null && this.form.get('image').value._files[0]) {
        const reader = new FileReader();
        const file: File = this.form.get('image').value._files[0];

        reader.readAsDataURL(file);

        reader.onload = event => {
          this.imageUrl = reader.result;
        };
      } else {
        this.imageUrl = null;
      }
      
    });
    this.form.get('existingLesion').valueChanges.subscribe(data => {
      if (data == true) {
        this.form.controls['newLesion'].setValue(false, { emitEvent: false });
        if (this.form.get('region').value) {
          this.getLesions(this.form.get('region').value);
        }
      }
    });
    this.form.get('newLesion').valueChanges.subscribe(data => {
      if (data == true) {
        this.form.controls['existingLesion'].setValue(false, { emitEvent: false });
      }
    });
    this.form.get('region').valueChanges.subscribe(data => {
      if (this.form.get('existingLesion').value == true) {
        this.getLesions(data);
      }
    });
  }

  viewPage() {
    // Enable the correct view by setting corresponding booleans
    // Initialize boolean for downloading progress and fetch images from backend
    this.home = false;
    this.upload = false;
    this.view = true;
    this.gettingImages = true;
    this.getImages();
  }

  getLesions(region: string) {
    this._imageService.getLesions(region).subscribe(
      (response) => {
        this.lesions = response['results']
      },
      (error) => {

      }
    )
  }

  uploadImage() {
    // Set uploadPending == true to trigger progress bar / spinner for upload
    this.uploadPending = true;

    // Create form data from form
    const formData = new FormData();
    formData.append('image', this.form.get('image').value._files[0]);
    formData.append('newLesion', this.form.get('newLesion').value);
    formData.append('region', this.form.get('region').value);
    //formData.append('lesion_id', this.form.get('lesion_id').value);
    if (this.form.get('newLesion').value) {
      formData.append('description', this.form.get('description').value);
    } else if (this.form.get('existingLesion').value) {
      formData.append('lesion_id', this.form.get('lesion').value);
    }

    // Send form data to backend
    this._imageService.uploadImage(formData).subscribe(
      (response) => {
        // If successful, remove progress bar / spinner, set upload completed and successful
        //  Upload Success message will be shown
        this.uploadPending = false;
        this.uploadCompleted = true;
        this.uploadSuccess = true;
        this.classification = response['classification'];
      },
      (error) => {
        // If unsuccessful, remove progress bar / spinner, set upload completed and unsuccessful
        //  Upload Failed message will be shown
        this.uploadPending = false;
        this.uploadCompleted = true;
        this.uploadSuccess = false;
      })
  }

  getImages() {
    // Get images from backend and populate list of images to display
    this.gettingImages = true;
    this._imageService.getImages().subscribe(
      (response) => {
        //let jsonString = response.toString().replace(/'/g, '"').replace(/\s/g, "");
        //console.log(jsonString);
        //let responseObject: ImageList = JSON.parse(jsonString);
        //this.images = responseObject.results;
        /*this.images = response['results']
        for (let i = 0; i < this.images.length; i++){
          this._imageService.getImage(this.images[i].name).subscribe(
            (response: Blob) => {
              const reader = new FileReader();
              const file: Blob = response;

              reader.readAsDataURL(file);

              reader.onload = event => {
                this.images[i].imageURL = reader.result;
              }
              console.log(response);
              //this.images[i].imageURL = response.toString();
            })
        }*/
        this.regions = response['results']
        for (let r = 0; r < this.regions.length; r++) {
          for (let l = 0; l < this.regions[r].lesions.length; l++) {
            for (let i = 0; i < this.regions[r].lesions[l].images.length; i++) {
              this.regions[r].lesions[l].images[i].date_uploaded = new Date(this.regions[r].lesions[l].images[i].date_uploaded).toDateString();
              this._imageService.getImage(this.regions[r].lesions[l].images[i].name).subscribe(
                (response: Blob) => {
                  const reader = new FileReader();
                  const file: Blob = response;

                  reader.readAsDataURL(file);

                  reader.onload = event => {
                    this.regions[r].lesions[l].images[i].imageURL = reader.result;
                  }
                })
            }
          }
        }
        this.gettingImages = false;
        console.log("done")
      },
      (error) => {
        console.log(error)
        this.gettingImages = false;
      })
  }

  logout() {
    // Logout
    this._authService.logout();
  }

}
