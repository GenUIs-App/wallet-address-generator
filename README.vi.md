# Công Cụ Tạo Ví Blockchain

[English](README.md) | Tiếng Việt | [中文](README.zh.md)

Một công cụ Node.js đơn giản để tạo ví Ethereum trên mạng chính và lưu trữ chúng một cách an toàn.

## Yêu Cầu

- Node.js (phiên bản 14 trở lên)
- npm (Node Package Manager)

## Cài Đặt

1. Sao chép kho lưu trữ
2. Cài đặt các phụ thuộc:
```bash
npm install
```

## Cách Sử Dụng

Để tạo ví mới, bạn có thể sử dụng một trong các lệnh sau:

```bash
# Tạo ví ngẫu nhiên
npm start

# Tạo ví với một chuỗi cụ thể trong địa chỉ
npm start "12345"  # Sẽ tạo ví có chứa "12345" trong địa chỉ

# Hoặc sử dụng script create-wallet
npm run create-wallet "12345"

# Hoặc chạy trực tiếp với node
node src/index.js "12345"
```

Công cụ sẽ:
1. Tạo một ví Ethereum mới
   - Nếu có chuỗi được cung cấp, nó sẽ tiếp tục tạo ví cho đến khi tìm thấy một ví chứa chuỗi đó
   - Việc tìm kiếm không phân biệt chữ hoa chữ thường
   - Tất cả các lần thử đều được ghi lại vào các tệp trong thư mục `logs`
2. Hiển thị địa chỉ và khóa riêng tư
3. Lưu thông tin ví vào tệp JSON trong thư mục `wallets`
   - Định dạng tệp: `wallet_[tiền_tố_địa_chỉ]_[thời_gian].json`
   - Bao gồm: địa chỉ, khóa riêng tư, thời gian tạo và số lần thử (nếu sử dụng tìm kiếm chuỗi)

## Ghi Nhật Ký

Công cụ tạo hai loại nhật ký cho mỗi phiên tạo:

### 1. Nhật Ký Chi Tiết (`wallet_generation_[thời_gian].log`)
Chứa thông tin đầy đủ cho mỗi lần thử:
- Số lần thử
- Địa chỉ được tạo
- Khóa riêng tư
- Thời gian
- Liệu địa chỉ có chứa chuỗi mong muốn hay không (nếu được chỉ định)

### 2. Nhật Ký Chỉ Địa Chỉ (`wallet_addresses_[thời_gian].txt`)
Một tệp văn bản đơn giản với một địa chỉ trên mỗi dòng để dễ theo dõi:
```
0x1234...
0x5678...
0x9abc...
```

- Đầu ra console hiển thị tiến trình sau mỗi 100 lần thử
- Cả hai loại nhật ký đều được lưu trữ trong thư mục `logs`
- Mỗi phiên tạo sẽ tạo ra các tệp nhật ký mới với dấu thời gian

⚠️ **QUAN TRỌNG**: 
- Các tệp ví được lưu trữ trong thư mục `wallets`
- Giữ các tệp ví an toàn và không bao giờ chia sẻ chúng với bất kỳ ai
- Cân nhắc mã hóa các tệp ví để tăng cường bảo mật
- Lưu trữ bản sao lưu của các tệp ví ở vị trí an toàn
- Cân nhắc sử dụng ví phần cứng cho số lượng lớn
- Tìm kiếm các chuỗi cụ thể trong địa chỉ có thể mất nhiều thời gian hơn tùy thuộc vào chuỗi
- Các tệp nhật ký chứa khóa riêng tư - hãy giữ chúng an toàn!

## Lưu Ý Bảo Mật

- Công cụ này tạo ví cục bộ trên máy của bạn
- Khóa riêng tư được lưu trữ trong các tệp JSON trong thư mục `wallets`
- Các tệp ví không bao giờ được truyền qua mạng
- Luôn xác minh rằng bạn đang sử dụng kết nối bảo mật khi sử dụng ví đã tạo
- Cân nhắc sử dụng ví phần cứng để tăng cường bảo mật
- Các tệp nhật ký chứa thông tin nhạy cảm - xử lý cẩn thận!

## Phát Triển

Để chạy kiểm tra:
```bash
npm test
```
