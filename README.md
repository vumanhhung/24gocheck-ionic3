# 24gocheck-ionic3

One Paragraph of project description goes here

## Yêu cầu

1. [Node.js 8.0 trở lên](https://nodejs.org/en/)
1. [Ionic 3](https://ionicframework.com/docs/intro/installation/)
1. [Git](https://git-scm.com/downloads)
```
$ npm install -g ionic cordova
```

## Bắt đầu
```
$ git init
$ git clone link
$ git remote -v
$ git remote add <tên_repo>
$ git checkout -b develop
$ 
```

## Cấu trúc thư mục

```
thư mục gốc
├── ...
├── plugins
├── resources
├── src #chủ yếu sẽ làm việc với folder này
    ├── app
        ├── ...
    ├── assets #chứa các thư mục, file hình ảnh, i18n, icon, ...
        ├── ...
    ├── components #
        ├── ...
    ├── pages
        ├── accounts
        ├── cart
        ├── categories
        ├── home
        ├── map
        ├── notifications
        ├── products
        ├── search
        ├── shops
        ├── tabs
    ├── providers
        ├── ...
    ├── theme
        ├── ...
    ├── index.html
    ├── ...
├── www
├── ...
```

### API

1. [OpenCartAPI](https://github.com/i2cs/i2csmobile-docs/tree/master/Backend/OpenCart%20Module/OpenCart%202.x%20API)
1. API mới thêm
   1. /route=api2/product_create  (Chủ gian hàng tạo sản phẩm)
   >Các tham số
   
   * product_name [String] Tên sản phẩm
   * product_price [Number] Giá sản phẩm
   * product_quantity [Number] Số lượng
   * product_weight [Number] Trọng lượng
   * product_description [String] Miêu tả sản phẩm
   * product_meta_title [String] Tiêu đê
   * product_model [String] Model sản phẩm
   * image [String] Url tương đối của ảnh
   * product_category [Number] 
   * zone_id [Number] Id của thành phố
   * status [Number] Trạng thái sản phẩm
   * user_id [Number] Id của người tạo sản phẩm

   1. /route=api2/shops (Hiển thị các gian hàng)
   1. /route=api2/upload (Upload ảnh lên server)
   1. /route=api2/user_edit (Sửa tài khoản)
   1. /route=api2/user_list (Hiển thị danh sách gian hàng bán kính 10km)


### Google Map

**1. Cài đặt**


Thêm JavaScript SDK
Để JavaScript API có sẵn trong ứng dụng, cần phải thêm thư viện. Bạn có thể làm như vậy bằng cách tải nó trong file src / index.html.

<script src="http://maps.google.com/maps/api/js?key=YOUR_API_KEY_HERE"></script>
<script src="cordova.js"></script>

Lưu ý: Điều quan trọng là bạn tạo một khóa API cho Google Maps và thêm nó vào chuỗi truy vấn cho thẻ <script> ở trên (thay thế **YOUR_API_KEY_HERE**). Để tạo một khóa API, chỉ cần đi tới [trang này](https://developers.google.com/maps/documentation/javascript/get-api-key) và thực hiện theo các hướng dẫn trong phần Nhận chìa khóa API.

**2. Hiển thị map**


Trong ionic 3, để hiển thị map bạn cần thêm thẻ element và set các thuộc tính trong html file (ở đây cụ thể là search.html). Sau đó trong file .ts (search.ts), đây là file chính khởi tạo map. 

*Những thuộc tính, biến quan trọng cần khởi tạo từ đầu:*

* declare var google; => biến này dùng để khởi tạo map, sẽ được sử trong hàm loadmap() bên dưới.

* @ViewChild('map') mapElement: ElementRef;
=> đây là thành phần quan trọng trong search.ts để search.html có thể nhận biết được element và hiển thị map.
Khi đó trong file search.html
Element: <div #map id="map" style="height: 300px;"></div> sẽ tham chiếu trực tiếp đến @ViewChild('map') của search.ts

* map: any; => biến này dùng để chưa toàn bộ dữ liệu mà map sẽ hiển thị (bao gồm data lấy từ trên server, ...)

* directionsService = new google.maps.DirectionsService;
* directionsDisplay = new google.maps.DirectionsRenderer;
=> hai biến này sẽ sử dụng để làm chức năng chỉ đường (direction)
* Geolocation: biến này sẽ sử dụng để làm chức năng xác định vị trí hiện tại. Ứng dụng sẽ tự động xác định vị trí hiện tại của bạn.

Ngoài ra phải add thêm thư viện như GoogleMapsProvider, Geolocation.

*Những hàm khởi tạo để hiển thị map cơ bản trên ionic:*

* loadmap(): Hàm này có chức năng khởi tạo map dựa vào những biến đã nói ở trên, hàm này cũng sử dụng Geolocation để xác định vị trí hiện tại của bạn, khi map được load, plugin này sẽ tự xác định vị hiện tại của bạn thông qua các thiết bị máy tính hoặc mobile.

* locate(): Là một chức năng tiện ích của map, khi người dùng click vào  button **Vị trí** trên map, hệ thống sẽ tự động xác định vị trí hiện tại của bạn.

* nearBy(): Hàm này xác định toàn bộ các gian hàng, sản phẩm quanh vị trị hiện tại bạn đang đứng, lấy trực tiếp dữ liệu từ server thông qua [HTTP Client Request](https://angular.io/guide/http) (Xem docs để biết thêm thông tin và cách sử dụng)
HTTP sẽ lấy dữ liệu dựa vào các Service và Provider được Injection từ constructor(){}, sau đó trả về giá trị là mảng và add toàn bộ vào marker dựa vào latitude và longitude => hiển thị tất cả các marker lên map.


