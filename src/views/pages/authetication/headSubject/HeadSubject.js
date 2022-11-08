import React from "react";
import './HeadSubject.scss';
import NavBar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import { FaPlusCircle, FaEdit, FaTrash, FaCheck } from "react-icons/fa";


export default class App extends React.Component {

  state = {
    courses: [
      { name: 'Nêu rõ mục đích yêu cầu của bài giảng' },
      { name: 'Cấu trúc của bài giảng được thiết kế có hệ thống và lôgic' },
      { name: 'Phân bố thời gian hợp lý cho các vấn đề trong bài giảng' }
    ],
    newName: ''
  }

  // Start Add Course
  changeHandle = (e) => {
    this.setState({ newName: e.target.value })
  }
  submitAdd = (e) => {
    e.preventDefault()

    if (this.state.newName) {
      let { newName, courses } = this.state;

      courses.push({ name: newName });

      this.setState({
        courses,
        newName: ''
      })

    } else { return false; }
  }

  // Start Delete Course
  deleteHandle = (index) => {
    let { courses } = this.state;

    courses.splice(index, 1)

    this.setState({ courses })
  }

  // Start Edit Course
  editHandle = (index, value) => {
    let { courses } = this.state,
      course = courses[index];

    course['name'] = value;

    this.setState({ courses })
  }




  render() {

    const coursesList = this.state.courses.length ? (
      this.state.courses.map((course, index) => {
        return <List skills={course.name} key={index} sendIndex={index} deleteHandle={this.deleteHandle} editHandle={this.editHandle} />;
      })
    ) : (
      <p className="error">Không có tiêu chí nào</p>
    )

    return (
      <>
        <div className="app">
          <div className="padd"></div>
          <div className="crud">
            <h1>Thay đổi tiêu chí dự giờ</h1>
            <form onSubmit={this.submitAdd}>
              <input
                type="text"
                placeholder="Nhập Tiêu chí"
                onChange={this.changeHandle}
                value={this.state.newName}
                required
                maxLength="15"
              />
              <button type="submit"><FaPlusCircle/></button>
            </form>
            <ul>{coursesList}</ul>
          </div>

        </div>
        <Footer/>
      </>)
  }
}

// Start List
class List extends React.Component {

  state = {
    isEdit: false
  }

  renderMain = () => {
    return (
      <li>
        <div>
          <span>{(this.props.sendIndex + 1) + '. ' + this.props.skills}</span>
          <button onClick={this.stateToggle}><FaEdit   /></button>
          <button onClick={() => this.props.deleteHandle(this.props.sendIndex)}><FaTrash /></button>
        </div>
        <div>
        </div>
      </li>
    )
  }

  // Toggle state
  stateToggle = () => {
    let { isEdit } = this.state;
    this.setState({
      isEdit: !isEdit
    });
  }

  submitEdit = (e) => {
    e.preventDefault();
    this.props.editHandle(this.props.sendIndex, this.input.value);
    this.stateToggle(); // false = isEdit 
  }

  renderEdit = () => {
    return (
      <form onSubmit={this.submitEdit}>
        <input
          type="text"
          ref={(v) => { this.input = v }}
          defaultValue={this.props.skills}
          required
          maxLength="15"
        />
        <button><FaCheck/></button>
      </form>
    )
  }

  render() {
    let { isEdit } = this.state;
    return (
      <React.Fragment>
        {isEdit ? this.renderEdit() : this.renderMain()}
      </React.Fragment>
    )

  }
}
