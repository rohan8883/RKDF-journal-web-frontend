import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFTextArea,
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import {  rkdfApi } from '@/lib'

// Define the schema for journal form
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  issn: yup.string().required('ISSN is required'),
  publisher: yup.string().required('Publisher is required'),
  foundedYear: yup.number().typeError('Founded year must be a number').required('Founded year is required'),
  website: yup.string().url('Must be a valid URL').required('Website is required'),
  coverImage: yup.string(),
})

type FormData = yup.InferType<typeof schema>

// Define the journal interface
interface I_JOURNAL_VIEW {
  data: {
    title: string;
    description: string;
    issn: string;
    publisher: string;
    foundedYear: number;
    website: string;
    coverImage?: string;
  }
}

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  id?: string
  edit?: boolean
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  refetch?: () => void
}

export default function JournalForm({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetch,
}: Readonly<Props>) {
  const postMutation = usePostMutation({})
  const putMutation = usePutMutation({})
  const { data, isFetching } = useApi<I_JOURNAL_VIEW>({
    api: `${rkdfApi.getJournalById}/${id}`,
    key: 'getJournalById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: { 
      title: '', 
      description: '', 
      issn: '', 
      publisher: '', 
      foundedYear: undefined, 
      website: '', 
      coverImage: '' 
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formData: FormData) => {
    try {
      if (edit && formData) {
        const res = await putMutation.mutateAsync({
          api: `${rkdfApi.updateJournal}/${id}`,
          data: formData,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Journal not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: rkdfApi.createJournal,
          data: formData,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Journal not created successfully')
        }
        methods.reset()
      }
      setOpen(false)
      setEdit?.(false)
      refetch?.()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (edit && data) {
      methods.reset({
        title: data.data.title,
        description: data.data.description,
        issn: data.data.issn,
        publisher: data.data.publisher,
        foundedYear: data.data.foundedYear,
        website: data.data.website,
        coverImage: data.data.coverImage || '',
      })
    } else {
      methods.reset({ 
        title: '', 
        description: '', 
        issn: '', 
        publisher: '', 
        foundedYear: undefined, 
        website: '', 
        coverImage: '' 
      })
    }
  }, [edit, data])

  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title}
      setEdit={setEdit}
      edit={edit}
      isLoading={isFetching}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-1 gap-x-2 gap-y-4'>
          <div>
            <RHFTextField name='title' placeholder='Enter journal title' />
          </div>
          <div>
            <RHFTextArea
              name='description'
              placeholder='Enter journal description'
            />
          </div>
          <div>
            <RHFTextField name='issn' placeholder='Enter ISSN number' />
          </div>
          <div>
            <RHFTextField name='publisher' placeholder='Enter publisher name' />
          </div>
          <div>
            <RHFTextField 
              name='foundedYear' 
              placeholder='Enter founded year'
              type='number'
            />
          </div>
          <div>
            <RHFTextField name='website' placeholder='Enter website URL' />
          </div>
          <div>
            <RHFTextField name='coverImage' placeholder='Enter cover image URL (optional)' />
          </div>
          <Separator />
          <div>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type='submit'
              className='h-11 w-full rounded-xl'
            >
              Submit
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  )
}