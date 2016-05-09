import React from 'react';
import ReactDOM from 'react-dom';
import ReactSpinner from 'react-spin'
import connectToStores from 'alt-utils/lib/connectToStores';
import ContentActions from '../actions/ContentActions';
import ContentStore from '../stores/ContentStore';
import PopupStore from '../stores/PopupStore';

var TYPE_LIST = {
        type: [
            'creator',
            'work',
        ]
    },

    RIGHT_HEADER_TITLE = {
        creator: 'Creators of the month',
        work: 'Feature Works',
    },

    ADDITIONAL_CONTENT = {
        creator(props) {
            return (
                <div>
                    <p className="name"><span>{props.name}</span></p>
                    <p className="job"><span>{props.job}</span></p>
                </div>
            );
        },

        work(props) {
            return null;
        },
    };

//Container
class Container extends React.Component {
    render() {
        return (
            <div>
                <PopupContainer/>
				<LeftContent/>
				<RightContent/>
			</div>
        );
    }
}

//Popup
class PopupContainer extends React.Component {
    constructor() {
        super();

        this.displayName = 'PopupContainer';
    }

    static getStores(props) {
        return [PopupStore];
    }

    static getPropsFromStores(props) {
        var popupState = PopupStore.getState();

        return {
            info: popupState.info,
            type: popupState.type,
            show: popupState.show
        };
    }
    
    handleClick() {
        ContentActions.hidePopup(this.props.type);
    }

    render () {
        if (this.props.show == false) {
            return null;
        }

        var additionalContent = ADDITIONAL_CONTENT[this.props.type](this.props.info);
        var closeIcon = (<i className="fa fa-times" aria-hidden={true}></i>);

        return (
            <div>
                <div className="popup-overlay" onClick={this.handleClick.bind(this)}></div>
                <div className="popup">
                     <div className="popup-controls">
                     <span className="popup-close" onClick={this.handleClick.bind(this)}>{closeIcon}</span>
                </div>
                <div className="popup-content">
                    <img src={this.props.info.img} alt="Popup Image"/>
                    {additionalContent}
                </div>
                </div>                  
            </div>
        );
    }
}

PopupContainer = connectToStores(PopupContainer);

//Left Content
class LeftContentHeader extends React.Component {
    render() {
        return (
            <div className="header">
        	<div className="logo">
          		<img src="logo.png" alt="Pimmor Logo"/>
        	</div>
        	<ul className="header-buttons">
          		<li><a href="#"><span>Sign In</span></a></li>
          		<li><a href="#"><span>Create an account</span></a></li>
        	</ul>
      		</div>
        );
    }
}

class LeftContentSlogan extends React.Component {
    render() {
        return (
            <div className="slogan">
        		<h1 className="slogan1"><span>Let people know about your next masterpiece</span></h1>
        		<h3 className="slogan2"><span>Showcase your works of books, photos, drawing or just simply be inspired</span></h3>
      		</div>
        );
    }
}

class LeftContentButtons extends React.Component{
    render() {
        return (
            <div className="buttons">
        		<a className="upload" href="#"><span>Start Uploading</span></a>
        		<a className="search" href="#"><span>Start Searching</span></a>
      		</div>
        );
    }
}

class LeftContentFooter extends React.Component {
    render() {
        return (
            <ul className="footer">
        		<li><a href="#"><span>About Us</span></a></li>
        		<li><a href="#"><span>Privacy Policy</span></a></li>
       			<li><a href="#"><span>Term of Use</span></a></li>
        		<li><span>@ 2015 Pimmor. All rights reserved</span></li>
      		</ul>
        );
    }
}

class LeftContent extends React.Component {
    render() {
        return (
            <div className="left-content">
				<LeftContentHeader/>
				<LeftContentSlogan/>
				<LeftContentButtons/>
				<LeftContentFooter/>
			</div>
        );
    }
}

//Right Content
class RightContent extends React.Component {
    constructor() {
        super();

        this.displayName = 'RightContent';
        this.state = TYPE_LIST;
    }

    static propTypes = {
        info: React.PropTypes.object
    }

    static defaultProps = {
        info: {}
    }

    static getStores(props) {
        return [ContentStore];
    }

    static getPropsFromStores(props) {
        var contentState = ContentStore.getState();

        return {
            info: contentState.info,
        };
    }
    
    componentWillMount() {
        ContentActions.fetchContent(this.state.type);
    }

    render() {
        let data = this.props.info,
            rightBoxes = this.state.type.map((type, index) => {
                return (<RightBox key={index} data={data[type]} type={type}/>);
            });
 
        return (
            <div className = "right-content">
                {rightBoxes}
            </div>
        );
    }
}

RightContent = connectToStores(RightContent);

class RightBox extends React.Component {
    render() {
        var rightRow;
        
        if (this.props.data) {
            rightRow = (<RightRow data={this.props.data} type={this.props.type}/>);
        } else {
            var config = {
                top: '50%',
                left: '50%',
                position: 'relative'
            };
            rightRow = (
                <div className='spinner-placeholder'>
                    <ReactSpinner config={config}/>
                </div>
            );
        }

        return (
            <div> 
                <RightHeader type={this.props.type}/>
                {rightRow}
            </div>
        );
    }
}

class RightHeader extends React.Component {
    render() {
        var title = RIGHT_HEADER_TITLE[this.props.type];     
        return (
            <div>
        		<p className="section-title"><span>{title}</span></p>
        		<a className="see-all" href="#"><span>see all</span></a>
      		</div>
        );
    }
}

class RightRow extends React.Component {
    render() {   
        let type = this.props.type,
            rowNodes = this.props.data.map(data => {
                return (
                    <RightImage key={data.id} data={data} type={type}></RightImage>
                );
            });

        return (
            <div className="row-detail">
    			{rowNodes}
    		</div>
        );
    }
}

class RightImage extends React.Component {
    handleClick() {
        ContentActions.popupContent(this.props.data, this.props.type);
    }

    render() {
        var additionalContent = ADDITIONAL_CONTENT[this.props.type](this.props.data);
        return (
            <a className="item" href="#" onClick={this.handleClick.bind(this)}>
				<img src={this.props.data.img} alt="Image"/>	
                {additionalContent}		
			</a>
        );
    }
}

ReactDOM.render(<Container/>,
    document.getElementById('wrapper')
);