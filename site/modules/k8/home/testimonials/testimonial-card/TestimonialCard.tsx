import user from '@assets/images/user.svg'
import { StarIcon } from '@heroicons/react/24/solid'
import style from './TestimonialCard.module.css'

const TestimonialCard = ({ testimonialData }: { testimonialData: any }) => {
  return (
    <div className={style.testimonialCard}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={user.src} alt="avatar" className="absolute h-[80px] -top-5" />
      <div className="flex flex-col gap-1 ml-[100px]">
        <span className="font-bold truncate">{testimonialData.name}</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i: any) => (
            <StarIcon
              key={i}
              height={14}
              width={14}
              className={`text-[#6a4fe27a] ${i < 4 ? 'text-[#7252F7]' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className={style.textimonialText}>{testimonialData.desc}</div>
    </div>
  )
}

export default TestimonialCard
