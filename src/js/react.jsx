var React = require('react');
var ReactDOM = require('react-dom');
var alt = require('../alt');
var connectToStores = require('alt-utils/lib/connectToStores')
var ContentActions = require('../actions/ContentActions');
var CreatorStore = require('../stores/CreatorStore');
var WorkStore = require('../stores/WorkStore');
var PopupStore = require('../stores/PopupStore');
var callApi = require('../callApi/callApi');

//Container
var Container = React.createClass({
    render: function() {
        return (
            <div>
                <PopupContainer/>
				<LeftContent/>
				<RightContent/>
			</div>
        );
    }
});

//Popup
var PopupContainer = connectToStores({
     getStores() {
    return [PopupStore]
  },

  getPropsFromStores() {
    var popupState = PopupStore.getState()
    return {
      info: popupState.info,
      type: popupState.type,
      show: popupState.show
    }
  }
}, React.createClass({
    displayName: 'PopupContainer',
    handleClick: function() {
        ContentActions.hidePopup(this.props.type);
    },
    render : function() {
        if(this.props.show == false)
            return null;
        var creator = false;
        if(this.props.type == "creator") {
            creator = true;
        }
        else {
            creator = false;
        }

        return (
            <div>
             <div className="popup-overlay" onClick={this.handleClick}></div>
             <div className="popup">
                     <div className="popup-controls">
                     <span className="popup-close" onClick={this.handleClick}>X</span>
                 </div>
                 <div className="popup-content">
                         <img src={this.props.info.img} alt="Popup Image"/>
                         {creator ? <div>
                        <p className="name"><span>{this.props.info.name}</span></p>
                        <p className="job"><span>{this.props.info.job}</span></p>
                    </div>: null}
                 </div>
                 </div>                  
         </div>
        );
    }
}))

//Left Content
var LeftContentHeader = React.createClass({
    render: function() {
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
});

var LeftContentSlogan = React.createClass({
    render: function() {
        return (
            <div className="slogan">
        		<h1 className="slogan1"><span>Let people know about your next masterpiece</span></h1>
        		<h3 className="slogan2"><span>Showcase your works of books, photos, drawing or just simply be inspired</span></h3>
      		</div>
        );
    }
});

var LeftContentButtons = React.createClass({
    render: function() {
        return (
            <div className="buttons">
        		<a className="upload" href="#"><span>Start Uploading</span></a>
        		<a className="search" href="#"><span>Start Searching</span></a>
      		</div>
        );
    }
});

var LeftContentFooter = React.createClass({
    render: function() {
        return (
            <ul className="footer">
        		<li><a href="#"><span>About Us</span></a></li>
        		<li><a href="#"><span>Privacy Policy</span></a></li>
       			<li><a href="#"><span>Term of Use</span></a></li>
        		<li><span>@ 2015 Pimmor. All rights reserved</span></li>
      		</ul>
        );
    }
});

var LeftContent = React.createClass({
        render: function() {
            return (
                <div className="left-content">
					<LeftContentHeader/>
					<LeftContentSlogan/>
					<LeftContentButtons/>
					<LeftContentFooter/>
				</div>
            );
        }
    });
//Right Content
var RightContent = connectToStores({
    getStores() {
        return [WorkStore, CreatorStore];
    },

    getPropsFromStores() {
        var creatorState = CreatorStore.getState();
        var workState = WorkStore.getState();
        return {
            creatorInfo: creatorState.info,
            workInfo: workState.info
        }
    }
}, React.createClass({
    displayName: "Right Content",

    getInitialState: function() {
        return {
            type: [
                "creator",
                "work"
            ]
        };
    },
    componentWillMount: function() {
        ContentActions.fetchContent(this.state.type);
    },
    render: function() {
        return(
            <div className = "right-content">
                <RightBox data = {this.props.creatorInfo} type = "creator"/>
                <RightBox data = {this.props.workInfo} type = "work"/>
            </div>
        );
    }

}));

var RightBox = React.createClass({
    render: function() {        
        return (
            <div> 
                <RightHeader type={this.props.type}/>
                <RightRow data={this.props.data} type={this.props.type}/>
            </div>
        );
    }
});

var RightHeader = React.createClass({
    render: function() {
        var title;
        switch(this.props.type) {
            case "creator":
                title = 'Creators of the month';
                break;
            case "work": 
                title = 'Feature Works'
                break;
            default:
                break;
        }
        return (
            <div>
        		<p className="section-title"><span>{title}</span></p>
        		<a className="see-all" href="#"><span>see all</span></a>
      		</div>
        );
    }
});

var RightRow = React.createClass({
    render: function() {
        var type = this.props.type;
        var rowNodes = this.props.data.map(function(data) {
            return (
                <RightImage key={data.id} data={data} type ={type}></RightImage>
            );
        });
        return (
            <div className = "row-detail">
    			{rowNodes}
    		</div>
        );
    }
});

var RightImage = React.createClass({
    handleClick: function() {
        ContentActions.popupContent(this.props.data, this.props.type);
    },
    render: function() {
        var additionalContent;
        switch(this.props.type) {
            case "creator":
                additionalContent = <div>
                    <p className="name"><span>{this.props.data.name}</span></p>
                    <p className="job"><span>{this.props.data.job}</span></p>
                </div>
                break;
            case "work": 
                additionalContent = null;
                break;
            default:
                additionalContent = null;
                break;
        }
        return (
            <a className="item" href="#" onClick={this.handleClick}>
				<img src={this.props.data.img} alt="Image"/>	
                {additionalContent}		
			</a>
        );
    }
});

ReactDOM.render(<Container/>,
    document.getElementById('wrapper')
);