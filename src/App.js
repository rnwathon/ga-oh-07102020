import React from 'react';
import {
  Container,
  Input,
  Label,
  Button,
  Card, CardText, CardBody,
  CardTitle,
  FormFeedback
} from 'reactstrap'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function App() {
  let [rating, setRating] = React.useState([
    {
      email: "johnDoe@gmail.com",
      text: "lorem ipsum dolor sit amet.",
      rate: 3
    }
  ])

  let [forms, setForms] = React.useState({
    email: {
      value: "",
      errMsg: ""
    },
    text: {
      value: "",
      errMsg: ""
    },
    rate: {
      value: "",
      errMsg: ""
    }
  })

  // Struktur Data
  // Rating
  // - Review
  // - Rate

  // Kalau dia data satu
  // rating = {review: "", rate: ""}

  // Kalau dia datanya ada banyak
  // rating = [{review: "", rate: ""}]

  const onChange = (e) => {
    // In untuk meng clone state
    let newForm = {...forms}
    // Disarankan untuk pake Deep Clone dari Lodash
    // let newForm = deppClone(forms) -> contoh

    if(e.target.id === "email"){
      const emailRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      let valid = emailRegx.test(e.target.value)

      if(!valid){
        newForm.email.errMsg = "Email is not valid"
      } else {
        newForm.email.errMsg = ""
      }

      newForm.email.value = e.target.value;
    } else {
      newForm[e.target.id].value = e.target.value;
    }

    setForms(newForm)
  }

  const onSubmit = () => {
    let newForm = {...forms}
    let formKeys = Object.keys(forms)

    // Validasi value empty
    // Ini gunanya buat masukin error message
    for(let i = 0; i < formKeys.length; i++){
      let key = formKeys[i]
      let obj = forms[key]
      if(obj.value === ""){
        newForm[key].errMsg = "This field cannot be empty"
      } else {
        newForm[key].errMsg = ""
      }
    }

    // Yang ini gunanya buat ngecek ada error atau engga
    let formIsInvalid = false;
    for(let i = 0; i < formKeys.length; i++){
      let key = formKeys[i]
      let obj = forms[key]
      if(obj.errMsg){
        formIsInvalid = true;
        break;
      }
    }

    setForms(newForm)

    if(formIsInvalid) return;

    // Bikin object untuk di dalam array rating
    let ratingObj = {
      email: newForm.email.value,
      text: newForm.text.value,
      rate: newForm.rate.value
    }

    let newRating = [...rating]
    newRating.push(ratingObj)

    // Set state nya rating
    setRating(newRating)
    // Reset Form ke object awal
    setForms({
      email: {
        value: "",
        errMsg: ""
      },
      text: {
        value: "",
        errMsg: ""
      },
      rate: {
        value: "",
        errMsg: ""
      }
    })
  }



  return (
    <div className="App">
      <Container>
        <h1>Rating</h1>
        <Label for="email">email</Label>
        <Input type="email" id="email" value={forms.email.value} onChange={onChange} invalid={!!forms.email.errMsg}/>
        <FormFeedback>{forms.email.errMsg}</FormFeedback>
        <Label for="text">text</Label>
        <Input type="text" id="text" value={forms.text.value} onChange={onChange} invalid={!!forms.text.errMsg}/>
        <FormFeedback>{forms.text.errMsg}</FormFeedback>
        <Label for="rate">rate</Label>
        <Input type="select" id="rate" value={forms.rate.value || "placeholder"} onChange={onChange} invalid={!!forms.rate.errMsg}>
          <option value="placeholder" disabled> Choose Rate </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Input>
        <FormFeedback>{forms.rate.errMsg}</FormFeedback>
        <br />  
        <Button color="primary" onClick={onSubmit}>Submit</Button>

        <hr />

        {/* Nampilin Rating */}
        {rating ? rating.map(item => {
          let rate = []
          let tracker = item.rate;
          for(let i = 0; i < item.rate; i++){
            if(tracker < 1 && tracker > 0){
              // Untuk desimal
              rate.push(0)
            }else{
              // Untuk bilangan bulat
              rate.push(1)
            }
            tracker--;
          }

          return(
            <React.Fragment>
              <Card>
                <CardBody>
                  <CardTitle>{item.email}</CardTitle>
                </CardBody>
                <CardBody>
                  <CardText>{item.text}</CardText>
                  {rate.map(item => item === 1 ? <FaStar /> : <FaStarHalfAlt /> )}
                </CardBody>
              </Card>
            </React.Fragment>
          )
        }) : null}
      </Container>
    </div>
  );
}

export default App;
