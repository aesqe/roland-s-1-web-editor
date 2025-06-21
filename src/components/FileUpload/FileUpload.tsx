import { Group } from '@mantine/core'
import { DropzoneFullScreenProps, Dropzone } from '@mantine/dropzone'
import { IconUpload, IconX, IconFile } from '@tabler/icons-react'

import { S1Patch } from '../../types'

type Props = Partial<DropzoneFullScreenProps> & {
  handlePatchChange: (data: S1Patch) => void
}

export const FileUpload = ({ handlePatchChange, ...props }: Props) => {
  const handleDrop = (files: File[]) => {
    const file = files[0]
    const reader = new FileReader()

    if (file.type === 'application/json') {
      reader.onload = (event) => {
        handlePatchChange(JSON.parse(event.target?.result as string))
      }

      reader.readAsText(file)
    } else {
      console.log('Unsupported file type')
    }
  }

  return (
    <>
      <Dropzone.FullScreen
        onReject={(files) => console.log('rejected files', files)}
        maxSize={32 * 1024 * 1024}
        active
        onDrop={handleDrop}
        {...props}
      >
        <Group
          justify='center'
          gap='xl'
          mih={220}
          pos='fixed'
          top={0}
          left={0}
          w='100%'
          h='100%'
          bg='#FFFFFFDD'
        >
          <Dropzone.Accept>
            <IconUpload size={52} color='var(--mantine-color-blue-6)' stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color='var(--mantine-color-red-6)' stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFile size={52} color='var(--mantine-color-dimmed)' stroke={1.5} />
          </Dropzone.Idle>
        </Group>
      </Dropzone.FullScreen>
    </>
  )
}
