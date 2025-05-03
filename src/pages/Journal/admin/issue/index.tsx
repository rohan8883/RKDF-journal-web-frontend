import Page from '@/components/helmet-page'
import IssueList from './IssueList'
export default function IssueMaster() {
  return (
    <Page title='Issue List'>
      <div>
        <IssueList />
      </div>
    </Page>
  )
}
