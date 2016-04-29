var React = require('react');
var ReactDOM = require('react-dom');
var alt = require('../alt');
var connectToStores = require('alt-utils/lib/connectToStores')
var ContentActions = require('../actions/ContentActions');
var CreatorStore = require('../stores/CreatorStore');
var WorkStore = require('../stores/WorkStore');


//Container
var Container = React.createClass({
    render: function() {
        return (
            <div>
				<LeftContent/>
				<RightContent/>
			</div>
        );
    }
});

//Popup
// var Popup = React.createClass({
//     getInitialState: function() {
//         return {
//             show: true
//         };
//     },
//     handleClick: function() {
//         this.setState({ show: !this.state.show});
//     },
//     render: function() {
//     	var popup;
//     	if (this.state.show) {
//         return (
//             <div>
// 				<div className="popup-overlay" onClick={this.handleClick}></div>
//     			<div className="popup">
//       				<div className="popup-controls">
//         				<span className="popup-close" onClick={this.handleClick}>X</span>
//         			</div>
//         			<div className="popup-content">
//         					<img src={this.props.img} alt="Popup Image"/>
//         					{this.props.creator ? 
//         					<div>
//         						<p className="name"><span>{this.props.name}</span></p>
// 								<p className="job"><span>{this.props.job}</span></p>
// 							</div>
//         					: null}
//         			</div>
//       			</div>      			
//     		</div>
//         );
//   	  }
//     }
// });

// var PopupContainer = connectToStores({
//      getStores() {
//     return [PopupStore]
//   },

//   getPropsFromStores() {
//     var popupState = LocationStore.getState()
//     return {
//       info: popupState.info;
//     }
//   }
// }, React.createClass({
//     render
// }))

//Left Content
var LeftContentHeader = React.createClass({
    render: function() {
        return (
            <div className="header">
        	<div className="logo">
          		<img src="logo.png" alt="Pimmor Logo"/>
        	</div>
        	<ul className="header_buttons">
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
                <div className="left_content">
					<LeftContentHeader/>
					<LeftContentSlogan/>
					<LeftContentButtons/>
					<LeftContentFooter/>
				</div>
            );
        }
    })
    //Right Content 
var RightContent = React.createClass({
    render: function() {
        return (
            <div className="right_content">
				<CreatorsBox/>
				<WorksBox/>
			</div>
        );
    }
})



var CreatorsBox = connectToStores ({
    getStores() {
    return [CreatorStore]
  },

  getPropsFromStores() {
    var contentState = CreatorStore.getState();

    return {
      info: contentState.info
    }
  }
}, React.createClass({
    getInitialState: function() {
        return {
              type : 'creator'
        };
    },
    componentWillMount: function() {
        ContentActions.fetchContent(this.state.type);
    },
    render: function() {        
        return (
            <div> 
                <CreatorsHeader/>
                <CreatorsRow data = {this.props.info}/>
            </div>
        );
    }
}));

var CreatorsHeader = React.createClass({
    render: function() {
        return (
            <div>
        		<p className="section_title"><span>Creators of the month</span></p>
        		<a className="see_all" href="#"><span>see all</span></a>
      		</div>
        );
    }
});

var CreatorsRow = React.createClass({
    render: function() {
        var rowNodes = this.props.data.map(function(data) {
            return (
                <CreatorImage key={data.id} img={data.img} name={data.name} job={data.job}></CreatorImage>
            );
        });
        return (
            <div className = "row_detail">
    			{rowNodes}
    		</div>
        );
    }
});

var CreatorImage = React.createClass({
    getInitialState: function() {
        return {
            showPopup: false
        };
    },
    handleClick: function() {
        this.setState({ showPopup: !this.state.showPopup });
    },
    render: function() {
        return (
            <a className="item" href="#" onClick={this.handleClick}>
				<img src={this.props.img} alt="Creator Image"/>
				<p className="name"><span>{this.props.name}</span></p>
				<p className="job"><span>{this.props.job}</span></p>
				{this.state.showPopup ? <Popup creator={true} img={this.props.img} name={this.props.name} job={this.props.job}/> : null} 
			</a>
        );
    }
});

var WorksBox = connectToStores ({
    getStores() {
    return [WorkStore]
  },

  getPropsFromStores() {
    var contentState = WorkStore.getState()
    return {
      info: contentState.info
    }
  }
}, React.createClass({
    getInitialState: function() {
        return {
              type : 'work'
        };
    },
    componentWillMount: function() {
        ContentActions.fetchContent(this.state.type);
    },
    render: function() {        
        return (
            <div> 
                <WorksHeader/>
                <WorksRow data = {this.props.info}/>
            </div>
        );
    }
}));

var WorksHeader = React.createClass({
    render: function() {
        return (
            <div>
        		<p className="section_title"><span>Feature Works</span></p>
        		<p className="see_all safari_compat" href="#"><span>see all</span></p>
      		</div>
        );
    }
});

var WorksRow = React.createClass({
    render: function() {
        var rowNodes = this.props.data.map(function(data) {
            return (
                <WorkImage key={data.id} img={data.img}></WorkImage>
            );
        });
        return (
            <div className="row_detail">
    			{rowNodes}
    		</div>
        );
    }
});

var WorkImage = React.createClass({
	getInitialState: function() {
        return {
            showPopup: false
        };
    },
    handleClick: function() {
        this.setState({ showPopup: !this.state.showPopup });
    },
    render: function() {
        return (
            <a className="item" href="#" onClick={this.handleClick}>
				<img src={this.props.img} alt="Work Image"/>
				{this.state.showPopup ? <Popup img={this.props.img}/> : null} 				
			</a>
        );
    }
})

ReactDOM.render(<Container/>,
    document.getElementById('wrapper')
);
