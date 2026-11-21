import type { NewsArticle } from "@/features/news/types/article";
import { imageAssets } from "@/lib/image-assets";

export const newsArticles: ReadonlyArray<NewsArticle> = [
  {
    slug: "chuan-bi-thong-tin-khi-thue-xe-du-lich",
    title: "Trước khi đặt xe du lịch: 5 thông tin cần chuẩn bị",
    excerpt:
      "Chuẩn bị ngày đi, điểm đón, số hành khách và hành lý để trao đổi nhu cầu thuê xe rõ ràng ngay từ đầu.",
    category: "Cẩm nang thuê xe",
    image: imageAssets.minibus,
    imageAlt: "Hình ảnh minh họa xe phục vụ chuyến đi theo nhóm",
    featured: true,
    introduction:
      "Một cuộc trao đổi thuê xe sẽ thuận lợi hơn khi lịch trình đủ rõ. Trước khi liên hệ, hãy dành ít phút ghi lại những thông tin dưới đây.",
    sections: [
      {
        heading: "1. Mục đích và thời gian chuyến đi",
        paragraphs: [
          "Bạn đi du lịch, về quê, dự sự kiện hay cần xe phục vụ công việc? Hãy nêu mục đích chuyến đi cùng ngày khởi hành, giờ đón dự kiến và thời điểm cần xe kết thúc phục vụ.",
          "Nếu lịch trình chưa chốt, hãy chia sẻ phương án hiện tại và cho biết phần nào còn có thể thay đổi.",
        ],
      },
      {
        heading: "2. Điểm đón, điểm trả và các điểm dừng",
        paragraphs: [
          "Ghi địa chỉ hoặc tên địa điểm đón, trả. Với chuyến đi qua nhiều nơi, hãy liệt kê các điểm dừng chính để hai bên hình dung được lộ trình.",
        ],
      },
      {
        heading: "3. Số hành khách và hành lý",
        paragraphs: [
          "Cho biết số người lớn, trẻ em và lượng hành lý dự kiến. Nếu có vali cỡ lớn, xe đẩy hoặc vật dụng cồng kềnh, hãy báo trước để được tư vấn loại xe phù hợp.",
        ],
      },
      {
        heading: "4. Hình thức thuê bạn đang cần",
        paragraphs: [
          "Xác định bạn cần xe có tài xế hay xe tự lái, thuê theo chuyến hay theo tháng. Nói rõ mong muốn ngay từ đầu sẽ giúp việc trao đổi tập trung hơn.",
        ],
      },
      {
        heading: "5. Những điều cần xác nhận trước khi chốt",
        paragraphs: [
          "Trước khi xác nhận, hãy thống nhất loại xe, thời gian phục vụ, lộ trình, điểm đón trả, chi phí và các điều kiện thuê. Nếu có thay đổi sau đó, hãy báo lại sớm cho bên cung cấp dịch vụ.",
        ],
        points: [
          "Ngày đi và giờ đón dự kiến",
          "Điểm đón, điểm trả và các điểm dừng",
          "Số hành khách và lượng hành lý",
          "Hình thức thuê và chi phí liên quan",
        ],
      },
    ],
  },
  {
    slug: "chon-loai-xe-theo-so-hanh-khach",
    title: "Chọn xe theo số người và hành lý: cần lưu ý gì?",
    excerpt:
      "Số chỗ ngồi chỉ là một phần. Hành lý, quãng đường và sự thuận tiện của cả nhóm cũng cần được tính đến.",
    category: "Kinh nghiệm di chuyển",
    image: imageAssets.mpv,
    imageAlt: "Hình ảnh minh họa một dòng xe MPV",
    introduction:
      "Chọn xe vừa đủ chỗ nhưng không còn không gian cho hành lý có thể khiến chuyến đi kém thoải mái. Hãy cân nhắc cả nhóm đi, đồ mang theo và lịch trình trước khi quyết định.",
    sections: [
      {
        heading: "Đếm đủ người tham gia",
        paragraphs: [
          "Tính cả người lớn, trẻ em và thành viên có thể tham gia sau khi chốt kế hoạch. Nếu trong đoàn có người lớn tuổi hoặc cần hỗ trợ lên xuống xe, hãy tính đến sự thuận tiện khi sắp xếp chỗ ngồi.",
        ],
      },
      {
        heading: "Ước lượng hành lý",
        paragraphs: [
          "Vali, xe đẩy trẻ em, thiết bị công việc và đồ dùng cá nhân đều cần chỗ. Hãy mô tả số lượng, kích thước tương đối và những món đồ cồng kềnh khi trao đổi.",
        ],
      },
      {
        heading: "Xem xét thời gian ngồi xe và lộ trình",
        paragraphs: [
          "Nhu cầu đi trong nội thành, di chuyển liên tỉnh, đi nhiều ngày hoặc đưa đón theo lịch cố định sẽ có cách bố trí khác nhau. Chia sẻ lộ trình và thời gian sử dụng để được tư vấn sát hơn.",
        ],
      },
      {
        heading: "Dùng checklist ngắn trước khi liên hệ",
        paragraphs: [
          "Bạn có thể chuẩn bị nhanh các thông tin sau để cuộc trao đổi tập trung vào phương án phù hợp:",
        ],
        points: [
          "Số người lớn và trẻ em",
          "Số lượng vali hoặc hành lý cồng kềnh",
          "Ngày đi, thời gian sử dụng và lộ trình",
          "Nhu cầu xe có tài xế hay tự lái",
        ],
      },
    ],
  },
  {
    slug: "nhung-dieu-can-thong-nhat-khi-don-san-bay",
    title: "Đặt xe đón sân bay: 5 thông tin cần thống nhất",
    excerpt:
      "Mã chuyến bay, nhà ga, điểm gặp, số hành khách và cách liên hệ là những chi tiết nên xác nhận trước ngày di chuyển.",
    category: "Kinh nghiệm di chuyển",
    image: imageAssets.sedan,
    imageAlt: "Hình ảnh minh họa một dòng xe sedan",
    introduction:
      "Ở sân bay, chỉ lệch một thông tin nhỏ như nhà ga hoặc điểm hẹn cũng có thể khiến việc gặp nhau mất thời gian. Trước chuyến đi, hãy xác nhận những chi tiết sau với bên cung cấp xe.",
    sections: [
      {
        heading: "1. Mã chuyến bay và giờ dự kiến",
        paragraphs: [
          "Gửi ngày bay, hãng bay, mã chuyến và giờ hạ cánh hoặc cất cánh dự kiến. Nếu lịch bay được điều chỉnh, hãy cập nhật thông tin để hai bên trao đổi lại thời gian đón.",
        ],
      },
      {
        heading: "2. Nhà ga và điểm đón cụ thể",
        paragraphs: [
          "Xác nhận nhà ga, cửa ra hoặc điểm hẹn cụ thể. Đừng chỉ ghi chung tên sân bay nếu nơi đó có nhiều khu vực đón khách.",
        ],
      },
      {
        heading: "3. Số người và hành lý",
        paragraphs: [
          "Thông tin này giúp trao đổi loại xe phù hợp. Hãy báo trước nếu có vali lớn, xe đẩy hoặc vật dụng cần thêm không gian.",
        ],
      },
      {
        heading: "4. Người liên hệ và phương án cập nhật",
        paragraphs: [
          "Lưu số điện thoại của người phụ trách chuyến xe và thống nhất cách liên lạc nếu chuyến bay đổi giờ, hành lý nhận chậm hoặc điểm gặp thay đổi.",
        ],
      },
      {
        heading: "5. Thời gian chờ và chi phí phát sinh",
        paragraphs: [
          "Hỏi rõ thời gian chờ được tính như thế nào và trường hợp chuyến bay trễ sẽ được xử lý ra sao. Thống nhất trước các khoản phí có thể phát sinh để tránh hiểu nhầm sau chuyến đi.",
        ],
      },
    ],
  },
  {
    slug: "thue-xe-theo-chuyen-hay-theo-thang",
    title: "Thuê xe theo chuyến hay theo tháng? Chọn theo nhu cầu",
    excerpt:
      "Tần suất sử dụng, lịch trình và thời gian thuê sẽ giúp bạn cân nhắc giữa thuê theo chuyến và thuê dài hạn.",
    category: "Cẩm nang thuê xe",
    image: imageAssets.suv,
    imageAlt: "Hình ảnh minh họa một dòng xe SUV",
    introduction:
      "Không có một hình thức thuê phù hợp với tất cả mọi người. Hãy bắt đầu từ tần suất di chuyển và mức độ ổn định của lịch trình.",
    sections: [
      {
        heading: "Thuê theo chuyến khi lịch trình không thường xuyên",
        paragraphs: [
          "Nếu bạn chỉ cần xe cho một chuyến du lịch, sự kiện, lịch công tác hoặc một nhu cầu phát sinh, thuê theo chuyến giúp bạn trao đổi phương án theo từng lịch trình cụ thể.",
          "Khi hỏi dịch vụ, hãy nói rõ thời gian đi, điểm đón trả, các điểm dừng và thời lượng dự kiến sử dụng xe.",
        ],
      },
      {
        heading: "Cân nhắc thuê theo tháng khi nhu cầu lặp lại",
        paragraphs: [
          "Nếu việc di chuyển diễn ra thường xuyên theo lịch ổn định, thuê theo tháng có thể là hình thức đáng để tìm hiểu. Hãy nêu số ngày sử dụng, khung giờ, tuyến đường và nhu cầu có tài xế hay tự lái.",
        ],
      },
      {
        heading: "So sánh trên cùng một nhu cầu",
        paragraphs: [
          "Để lựa chọn có cơ sở, hãy so sánh tổng thời gian sử dụng, mức độ linh hoạt, lịch trình dự kiến và các điều kiện đi kèm. Đừng chỉ nhìn vào giá của một chuyến riêng lẻ hoặc một tháng thuê.",
        ],
        points: [
          "Tần suất cần xe trong tháng",
          "Lịch trình có cố định hay thường thay đổi",
          "Thời gian và quãng đường dự kiến",
          "Chi phí, giới hạn sử dụng và điều kiện thuê",
        ],
      },
      {
        heading: "Trao đổi để chọn phương án phù hợp",
        paragraphs: [
          "Khi đã có lịch trình dự kiến, hãy liên hệ để trao đổi cả hai phương án. Cung cấp thông tin cụ thể giúp việc tư vấn sát với nhu cầu sử dụng thực tế hơn.",
        ],
      },
    ],
  },
];

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}
