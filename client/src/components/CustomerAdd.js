import React from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from 'react-bootstrap/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component {
    constructor(props) { // 생성자
        super(props);
        this.state = {  // 변수 초기화
            tgpName: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        //console.log('핸들폼서밋: ' + e);
        this.addCustomer()
            .then((response) => {
                //console.log('핸들폼서밋: ' + response.data);
                this.props.stateRefresh(); // 고객 목록만 새로고침
            })
        this.setState({  // 변수 초기화
            tgpName: '',
            open: false
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('name', this.state.tgpName);
        
        const config = { // 파일 포함 시
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({  // 변수 초기화
            tgpName: '',
            open: false
        })
    }

    render() {
        return (
            <div>
                <Button variant="primary" size="sm" onClick={this.handleClickOpen}>
                    추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>TGP 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="이름" type="text" name="tgpName" value={this.state.tgpName} onChange={this.handleValueChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="primary" size="sm" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="secondary" size="sm" onClick={this.handleClose}>취소</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);