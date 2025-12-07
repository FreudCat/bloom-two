import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const Testimonials = () => {
  return (
    <div className='testimonials-wrapper'>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        <SwiperSlide>
          <div>
            <p>
              Lorem ipsum Lorem ipsup. Lorem ipsum. Lorem ipsup
              Lorem ipsupLorem ipsup
              Lorem ipsupLorem ipsupLorem ipsup
              Lorem ipsup2
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <p>
              Lorem ipsum Lorem ipsup. Lorem ipsum. Lorem ipsup
              Lorem ipsupLorem ipsup
              Lorem ipsupLorem ipsupLorem ipsup
              Lorem ipsup2
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <p>
              Lorem ipsum Lorem ipsup. Lorem ipsum. Lorem ipsup
              Lorem ipsupLorem ipsup
              Lorem ipsupLorem ipsupLorem ipsup
              Lorem ipsup2
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <p>
              Lorem ipsum Lorem ipsup. Lorem ipsum. Lorem ipsup
              Lorem ipsupLorem ipsup
              Lorem ipsupLorem ipsupLorem ipsup
              Lorem ipsup2
            </p>
          </div>
        </SwiperSlide>
      </Swiper >
    </div>
  )
}

export default Testimonials