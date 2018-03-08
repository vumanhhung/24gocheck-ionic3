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

