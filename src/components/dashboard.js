import { Page, FooterHelp, Layout, Loading, Frame } from '@shopify/polaris';
import { useEffect, useState } from 'react';
import PodContainer from '../containers/podContainer';
import RecordTableContainer from './recordTableContainer';
import TopBarComponent from './TopBarComponent';
import { connect } from 'react-redux';


function Dashboard({ pods }) {

  const [data, setData] = useState([]);
  useEffect(() => {
    if (pods.length != 0){
      setData(pods);
    }
  }, [pods]);

  if (data.length === 0) {
    return (
      <Page fullWidth>
      <TopBarComponent />
      <Layout.Section>
        <PodContainer>
        </PodContainer>
      </Layout.Section>
      <Layout.Section>
      </Layout.Section>
      <Layout.Section>
        <FooterHelp>
          Created by Team 3
        </FooterHelp>
      </Layout.Section>
    </Page>
    )
  }

  if (data.length > 0) {
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
}

const mapStateToProps = (state) => {
  return {
    pods: state.pods.pods
  };
};

export default connect(mapStateToProps)(Dashboard);
