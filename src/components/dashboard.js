import { Page, FooterHelp, Layout } from '@shopify/polaris';
import PodContainer from '../containers/podContainer';
import RecordTableContainer from './recordTableContainer';
import TopBarComponent from './TopBarComponent';

function Dashboard() {
  return (
    <Page fullWidth>
      <TopBarComponent />
      <Layout.Section>
        <PodContainer>
        </PodContainer>
      </Layout.Section>
      <Layout.Section>
        <RecordTableContainer>
        </RecordTableContainer>
      </Layout.Section>
      <Layout.Section>
        <FooterHelp>
          Created by Team 3
        </FooterHelp>
      </Layout.Section>
    </Page>
  );
}

export default Dashboard