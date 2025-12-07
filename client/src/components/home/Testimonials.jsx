import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const Testimonials = () => {
  return (
    <div className='testimonials-wrapper'>
      <h2>Testimonials from Colleagues</h2>
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
              "Angela has been organizing efforts to help the whole frontend team grow our knowledge and skills. She's always so thoughtful, supportive, and just a genuinely great person to work with."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <p>
              "Angela consistently exceeds expectations on the Frontend team. She provides timely and thorough responses regarding ongoing development. She is kind, funny, and highly adaptable."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <p>
              "Angela is a thorough and diligent code reviewer, testing many edge-cases and giving very high-quality feedback. She is also a natural leader who leads by example, willing to take on challenges and set a high standard."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <p>
              "Angela has an amazing eye for detail, she's extremely thorough with her work and is a great communicator."
            </p>
          </div>
        </SwiperSlide>
      </Swiper >
    </div>
  )
}

export default Testimonials