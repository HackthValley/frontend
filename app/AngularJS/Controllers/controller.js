app.controller('mainController', function($scope, $http, $route, $location) {
  const init = () => {
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
      const a = document.createElement('a');
      a.href = data;
      a.download = 'image.png';
      a.click();
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
  $scope.allowUploadPrompt = true;
  $scope.uploadimg = () => {
  document.getElementById('imgupload').click();
  }
  $scope.imgupload_src = "";
  $scope.SelectFile = function (e) {
  $scope.allowUploadPrompt=false;
  $scope.imgupload_src = URL.createObjectURL(e.target.files[0]);
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
