import { EditableProfileCard } from 'features/EditableProfileCard'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { VStack } from 'shared/ui/Stack'
import { Page } from 'widgets/Page/Page'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap="16" justify="between" max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  )
}

export default ProfilePage
