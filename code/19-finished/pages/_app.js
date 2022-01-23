import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <div>
    <meta httpEquiv="refresh" content="2"></meta>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </div>
  );
}

export default MyApp;
