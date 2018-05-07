import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'antd'
import api from "@/ajax/api";
import {post} from "@/ajax/ajax";
import Addbtn from '../newapp/newappadd'
import AppList from './List';
import NewApp from './NewApp';
import {push} from 'react-router-redux'

//我是修改的部分
class ButtonList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            listData: [],
            selectedRows: [],
            confirmDirty: false,
            autoCompleteResult: [],
            loading: false,
            listDisplay: true,
        };
    }

    componentDidMount() {
        this.loadList();
    }

    componentWillReceiveProps(nextProps) {
        // console.log('调用了');
    }

    delData = (arr) => {
        Modal.confirm({
            title: '重要提醒',
            content: (
                <p>
                    <span style={{color: '#ff0000'}}>该应用删除后不可恢复</span>，你还要继续吗？
                </p>
            ),
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                post({
                    url: api.appcontroller.delete,
                    data: {uapps: arr}
                }).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        this.loadTable();
                    }
                });
            }
        });
    };
    delAllData = () => {
        console.log(this.state.selectedRows);
        this.delData(this.state.selectedRows);
    };
    loadList = () => {
        this.setState({
            loading: true
        }, () => {
            post({
                url: api.appcontroller.list,
            }).then(res => {
                // console.log(res);
                if (res.code === 200) {
                    this.setState({
                        listData: res.data.list,
                        loading: false
                    })
                }
            }).catch(() => {
                this.setState({
                    loading: false
                })
            });
        });

    };
    loadTable = () => {
        alert(1);
    };
    changeListDisplay = (bol) => {
        this.setState({
            listDisplay: bol,
        })
    };

    render() {
        const {listData, loading} = this.state;
        const {goTo, appListDisplay, changeListDisplay} = this.props;
        return (
            <div className={'main-box'}>
                <AppList listDisplay={appListDisplay.display} listData={listData} loading={loading}
                         changeListDisplay={changeListDisplay} goTo={goTo}/>
                <NewApp listDisplay={appListDisplay.display}/>
            </div>
        )
    }
}

const mapStateToProps = ({appListDisplay}, ownProps) => {

    return {
        appListDisplay: appListDisplay
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        goTo(index) {
            dispatch({type: 'go', index: index});
        },
        changeListDisplay(bol) {
            dispatch({type: 'appSagaListDisplay'});

            //dispatch({type:'go',index:1});
        },

    }
};



export default connect(mapStateToProps, mapDispatchToProps)(ButtonList)
