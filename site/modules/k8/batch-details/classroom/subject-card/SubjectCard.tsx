import Image from 'next/image'
import { Card, Typography } from '@components/ui'
import { useRouter } from 'next/router'
import { SubjectMode } from '@modules/k8/constants'
import {getImageUrlFromObjectImageId} from "@lib/utilities";

const SubjectCard = ({
  mode,
  subject,
  handleClick,
}: {
  mode: SubjectMode
  subject: any
  handleClick?: () => void
}) => {
  return (
    <Card>
      <div
        className="min-w-[96px] w-full cursor-pointer flex flex-col items-center justify-center md:justify-start md:flex-row gap-4 md:gap-3 py-1 md:py-3 md:px-2.5 animated fadeIn duration-200"
        onClick={handleClick}
      >
        <div className="h-[40px] w-[40px] relative ">
          <Image
            src={getImageUrlFromObjectImageId(subject?.imageId)}
            alt="subject_logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>
          <Typography weight={600} variant="regular">
            <span className="text-[#444] line-clamp-1">
              {subject?.subject || ''}
            </span>
          </Typography>
        </div>
      </div>
    </Card>
  )
}

export default SubjectCard
