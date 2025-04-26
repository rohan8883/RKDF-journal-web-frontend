''
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
import { loanApi } from '@/lib'
import { I_ROLE_TYPE_VIEW } from './type'

const schema = yup.object().shape({
  planName: yup.string().required('Plan name is required'),
  amount: yup.number().typeError('Amount must be a number').required('Amount is required'),
  duration: yup.number().typeError('Duration must be a number').required('Duration is required'),
  interestRate: yup.number().typeError('Interest rate must be a number').required('Interest rate is required'),
  fineRate: yup.number().typeError('Fine rate must be a number').required('Fine rate is required'),
  description: yup.string().optional()
})
type FormData = yup.InferType<typeof schema>

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  id?: string
  edit?: boolean
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  refetch?: () => void
}

export default function PlanForm({
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
  const { data, isFetching } = useApi<I_ROLE_TYPE_VIEW>({
    api: `${loanApi.getPlanById}/${id}`,
    key: 'getPlanById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: {
      planName: '',
      amount: 0,
      duration: 0,
      interestRate: 0,
      fineRate: 0,
      description: ''
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${loanApi.updatePlan}/${id}`,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Role not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: loanApi.createPlan,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Role not created successfully')
        }
        // methods.reset({ roleName: '' })
      }
      setOpen(false)
      setEdit!(false)
      refetch!()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (edit && data) {
      methods.reset({
        planName: data.data.planName,
        amount: data.data.amount,
        duration: data.data.duration,
        interestRate: data.data.interestRate,
        fineRate: data.data.fineRate,
        description: data.data.description
      })
    } else {
      methods.reset({
        planName: '',
        amount: 0,
        duration: 0,
        interestRate: 0,
        fineRate: 0,
        description: ''
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
          <RHFTextField name='planName' placeholder='Enter plan name' />
          <RHFTextField name='amount' placeholder='Enter amount' type='number' />
          <RHFTextField name='duration' placeholder='Enter duration (in months)' type='number' />
          <RHFTextField name='interestRate' placeholder='Enter interest rate (%)' type='number' />
          <RHFTextField name='fineRate' placeholder='Enter fine rate (%)' type='number' />
          <RHFTextArea name='description' placeholder='Enter description' />
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
