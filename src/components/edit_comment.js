import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEditComment, fetchComment } from "../actions";
import Menu from "./menu";
import { Form, Header, Icon } from "semantic-ui-react";

class EditComment extends Component {
  state = {
    commentAuthor: "",
    commentContent: ""
  };

  componentDidMount() {
    //Get the comment by commentId, then set the state using the data
    //from the comment, and prepopulate the form with this data.
    this.props.fetchComment(this.props.match.params.commentId).then(() => {
      const { author, body } = this.props.comment;
      this.setState({
        commentAuthor: author,
        commentContent: body
      });
    });
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  //Submits input data from form fields
  handleSubmit = e => {
    e.preventDefault();
    const { commentContent, commentAuthor } = this.state;
    const data = {
      id: this.props.comment.id,
      body: commentContent,
      author: commentAuthor
    };
    //Dispatched editComment action with data from form
    this.props.fetchEditComment(data, data.id);
    //Redirects back to previous page.
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="add-post-form ">
        <Header textAlign="center" color="teal" as="h1">
          Edit Comment
        </Header>

        <div className="edit-comment-menu">
          <Menu />
        </div>

        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            name="commentAuthor"
            value={this.state.commentAuthor}
            onChange={this.handleInputChange}
            label="Author"
          />

          <Form.TextArea
            required
            name="commentContent"
            value={this.state.commentContent}
            onChange={this.handleInputChange}
            label="Comment Content"
            rows={6}
          />
          <Form.Button
            name="form-button-control-public"
            color="teal"
            compact
            size="large"
          >
            <Icon name="edit" />
            Edit comment
          </Form.Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comment: state.receiveComment
});

export default connect(mapStateToProps, { fetchEditComment, fetchComment })(
  EditComment
);
