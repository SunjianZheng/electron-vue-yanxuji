/* eslint-disable */
import EXIF from 'exif-js';

EXIF.getAllTags(img, (e) => {
  console.log(e);
})

EXIF.getData(document.getElementById('imgElement'), () => {
  const allMetaData = EXIF.getAllTags(this);

  let direction;
  if (allMetaData.GPSImgDirection) {
    const directionArry = allMetaData.GPSImgDirection; // 方位角
    direction = directionArry.numerator / directionArry.denominator;
  }

  let Longitude;
  if (allMetaData.GPSLongitude) {
    const LongitudeArry = allMetaData.GPSLongitude;
    const longLongitude =
      LongitudeArry[0].numerator / LongitudeArry[0].denominator +
      LongitudeArry[1].numerator / LongitudeArry[1].denominator / 60 +
      LongitudeArry[2].numerator / LongitudeArry[2].denominator / 3600;
    Longitude = longLongitude.toFixed(8);
  }

  let Latitude;
  if (allMetaData.GPSLatitude) {
    const LatitudeArry = allMetaData.GPSLatitude;
    const longLatitude =
      LatitudeArry[0].numerator / LatitudeArry[0].denominator +
      LatitudeArry[1].numerator / LatitudeArry[1].denominator / 60 +
      LatitudeArry[2].numerator / LatitudeArry[2].denominator / 3600;
    Latitude = longLatitude.toFixed(8);
  }

  console.log(direction, Longitude, Latitude);
});
