import { Fragment } from 'react';
import Head from 'next/head';
import { useMutex } from 'react-context-mutex';

import MeetupList from '../components/meetups/MeetupList';

let count = 1;

function sleep(delay) { 
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

const useFetchHook = () => {  
  const MutexRunner = useMutex();
  const mutex = new MutexRunner('pause');

  mutex.run(() => {     
      mutex.lock();
      try {                
          sleep(5000);                        
          mutex.unlock();
      } catch (e) {        
          mutex.unlock();
      }
  });
};

function HomePage(props) { 
  {useFetchHook()}

  // console.log("Refresh: " + count);

  // count = count + 1;

  // const meetups =  JSON.parse('[{"title": "TitleA", "address": "AddressA", "image": "https://media.istockphoto.com/photos/portrait-of-a-cat-picture-id174875518", "_id": "1"}]')

  // const meetupsArray = meetups.map((meetup) => ({
  //       title: meetup.title,
  //       address: meetup.address,
  //       image: meetup.image,
  //       id: meetup._id.toString(),
  //     }))  

  return (      
    <Fragment>   
      <Head>
        <title>Pets</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export async function getStaticProps() {

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
