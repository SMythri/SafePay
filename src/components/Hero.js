import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card } from 'react-bootstrap';
import Header from './Header';
import NGOSignIn from './NGOSignIn';
import DonorSignIn from './DonorSignIn';

function Hero() {
  const [modalShow, setModalShow] = useState(false);
  const [modalDonor, setModalDonor] = useState(false);
  return (
    <>
      <Header setModalShow={setModalShow} setModalDonor={setModalDonor}/>
      <NGOSignIn
        show={modalShow}
        onHide={() => setModalShow(false)} />
      <DonorSignIn
        show={modalDonor}
        onHide={() => setModalDonor(false)}
      />
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/frontpage.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>SafePay</h3>
            <p>Cultures all over the world have spoken a great deal on the merits of giving back to society. Charity finds mention in the works of eminent writers, thinkers and leaders extensively, and in all religions. However, for many giving back requires personal reasons. In the words of Aristotle: “To decide to whom to give it, and how large and when, and for what purpose and how, is neither in every man’s power nor an easy matter.” Here are some great reasons that can all give one a personal push to donate to charity.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/oneee.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Good Job</h3>
            <p>As you have embarked upon the journey of charity, you must keep yourself abreast of the most significant non-governmental organisations. International child rights NGO Save the Children is India’s most renowned and trust children’s charity, and runs pan-India projects that brings access to essential services like healthcare, education, social protection schemes and life-saving aid during disasters. Powered by kind-hearted individuals like yourself as well as corporations, the NGO is able to maintain a consistent supply chain of essential life-saving medicine, nutrition, and aid services. The knowledge that your hard-earned money has gone to a meaningful goal like child rights will give you impetus to do more for society.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-50"
            src="/backg.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Thank you</h3>
            <p>You just made the world a better place to live.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
      
      
    </>
  );
}

export default Hero;