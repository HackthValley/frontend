app.controller('mainController', function($scope, $http, $route, $location, BASE) {
  let animationStyle = {
    animation: "fadeIn linear 4s",
    "-webkit-animation": "fadeIn linear 4s",
    "-moz-animation": "fadeIn linear 4s",
    "-o-animation": "fadeIn linear 4s",
    "-ms-animation": "fadeIn linear 4s",
  };
  $scope.response = "";
  const predictImage = () => {
    const endpoint = BASE + "predict";
    $http.get(endpoint, {withCredentials: false}).then((result) => {
      if(result.data === "UnHealthy"){
      $scope.response = "high risk";
      }
      else {
      $scope.response = "no risk";
      }
      $scope.animatedText = animationStyle;
    }, (err) => console.error(err));
  }
  $scope.submitUploadedImage = () => {
    const endpoint = BASE + "upload_file";
    if(!$scope.uploadedFile)
    {
      return;
    }
    var fd = new FormData();
    fd.append("file", $scope.uploadedFile);
    $http.post(endpoint, fd, {
      withCredentials: false,
      headers: {'Content-Type': undefined},
      transformRequest: angular.indentity
    }).then((data)=>{predictImage();},(err)=>{console.error(err);});
  }
  const submitDrawnImage = (img) => {
    img = img.substring(img.indexOf(',')+1);
    console.log(img);
    const endpoint = BASE + "upload_canvas";
    var fd = new FormData();
    fd.append("file",  img);
    $http.post(endpoint, fd, {
      withCredentials: false,
      headers: {'Content-Type': undefined},
      transformRequest: angular.indentity
    }).then((data)=>{predictImage();},(err)=>{console.error(err);});
    };
  const init = () => {
    console.log(animationStyle);
    const canvas = document.getElementById('canvas');
    const saveButton = document.getElementById('save');
    const drawer = new Drawing(canvas, saveButton);
    let base_image = new Image();
    let context = canvas.getContext('2d');
    base_image.src = '../../white.png';
    base_image.onload = () => context.drawImage(base_image, 0, 0);
  };

  class Drawing {
    constructor(canvas, saveButton) {
      this.isDrawing = false;

      canvas.addEventListener('mousedown', () => this.startDrawing());
      canvas.addEventListener('mousemove', (event) => this.draw(event));
      canvas.addEventListener('mouseup', () => this.stopDrawing());

      saveButton.addEventListener('click', () => this.save());

      const rect = canvas.getBoundingClientRect();

      this.offsetLeft = rect.left;
      this.offsetTop = rect.top;

      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');
    }
    startDrawing() {
      this.isDrawing = true;
    }
    stopDrawing() {
      this.isDrawing = false;
    }
    draw(event) {
      if (this.isDrawing) {
        this.context.fillRect(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, 2, 2);
      }
    }
    save() {

      const data = this.canvas.toDataURL('image/png');
      //var file = new File([data], "upload.png", {type: "image",});
      submitDrawnImage(data);
    }
    load(event) {
      const file = [...event.target.files].pop();
      this.readTheFile(file)
        .then((image) => this.loadTheImage(image))
    }
    loadTheImage(image) {
      const img = new Image();
      const canvas = this.canvas;
      img.onload = function () {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      };
      img.src = image;
    }
    readTheFile(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      })
    }
  }
  init();
  $scope.uploadedFile = null;
  $scope.allowUploadPrompt = true;
  $scope.uploadimg = () => {
  document.getElementById('imgupload').click();
  }
  $scope.imgupload_src = "";
  $scope.SelectFile = function (e) {
  $scope.allowUploadPrompt=false;
  $scope.imgupload_src = URL.createObjectURL(e.target.files[0]);
  $scope.uploadedFile = e.target.files[0];
  $scope.$digest();
  }
  $scope.choice = "";
  $scope.allowDraw = true;
  $scope.allowUpload = false;
  $scope.updateChoice = () => {
    if($scope.choice === "draw"){
      $scope.allowUpload = false;
      $scope.allowDraw = true;
    }
    if($scope.choice === "upload"){
      $scope.allowDraw = false;
      $scope.allowUpload = true;
    }
  }
})
