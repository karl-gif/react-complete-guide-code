import { Fragment } from 'react';
import Head from 'next/head';
//import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

let count = 1;

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  // const client = await MongoClient.connect(
  //   'mongodb+srv://maximilian:TU6WdZF2EjFWsqUt@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority'
  // );
  // const db = client.db();

  // const meetupsCollection = db.collection('meetups');

  // const meetups = await meetupsCollection.find().toArray();

  // client.close();

  console.log("Refresh: " + count);

  count = count + 1;

  const meetups =  JSON.parse('[{"title": "TitleA", "address": "AddressA", "image": "https://media.istockphoto.com/photos/portrait-of-a-cat-picture-id174875518", "_id": "1"}]')

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
