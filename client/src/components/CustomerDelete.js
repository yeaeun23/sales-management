import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from 'react-bootstrap/Button';
import Typography from "@material-ui/core/Typography";

class CustomerDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({  // 변수 초기화          
            open: false
        })
    }

    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh(); // 목록 새로고침
    }
    
    render() {
        return (
            <div>
            <Button variant="danger" size="sm" onClick={this.handleClickOpen}>삭제</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle onClose={this.handleClose}>삭제</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 TGP를 삭제하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="danger" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                    <Button variant="secondary" onClick={this.handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;