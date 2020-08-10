import React from 'react'
import {Card, Carousel} from 'react-bootstrap'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const MoreInfo = (props) => {
    const    [images, setImages] = React.useState("")
    const [index, setIndex] = React.useState(0);

    const onload = async () =>{
        if (props.image !== ""){
            let i = 0
            let imgs = props.image.map(im => {
                return(
                <Carousel.Item key={i++}>
                    <img
                    className="d-block w-100"
                    src={im}
                    alt="iyour"
                    width='200' 
                    height='200'
                    />
                </Carousel.Item>)
            })
            setImages(imgs)
        }
    }
    if (images === "" ){
        onload()
    }

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                // color: 'white',
                position: 'fixed',
                paddingTop: '5vh'
            }}
        >
            <div>
                <Card style={{ width: '40rem', height: '40rem' }}>
                    {/* <Card.Img  src="" width='200' height='200' /> */}
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {images}
                    </Carousel>
                    <Card.Body>
                        <Card.Title><h2>{props.info.firstname} {props.info.lastname}</h2></Card.Title>
                        <div>
                            <div>
                                <h3>Age</h3>
                                <div>{props.info.age}</div>
                            </div>
                            <div>
                                <h3>Gender</h3>
                                <div>{props.info.gender}</div>
                            </div>
                            <div>
                                <h3>Bio</h3>
                                <div>{props.info.bio}</div>
                            </div>
                            <div>
                                <h3>Interests</h3>
                                <div>{props.info.interest}</div>
                            </div>
                            <div>
                                <h3>Fame</h3>
                                <div>{props.info.like}</div>
                            </div>
                            {/* <div>
                                <FontAwesomeIcon icon={faThumbsDown} size='2x' />
                                <FontAwesomeIcon icon={faThumbsUp} style={{marginLeft: '2vw'}} size='2x' />
                            </div> */}
                        </div>
                        
                    </Card.Body>
                </Card>
            </div>
            <div
                style={{
                    marginLeft: '10vw',
                    color: 'white'
                }}
                onClick={props.handleExit}
            >
                <FontAwesomeIcon icon={faTimes} size='3x' />
            </div>
        </div>
    )
}
