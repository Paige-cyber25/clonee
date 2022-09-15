import React from "react";
import { Outlet, Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

const Chats = () => {


  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <div className="chat-leftsidebar">
              <div className="px-4 pt-4 mb-4">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <h5 className="mb-4">Chats</h5>
                  </div>
                  <div className="flex-shrink-0">
                    <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Add Contact">


                      <button type="button" className="btn btn-soft-info btn-sm">
                        <i className="ri-add-line align-bottom"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="search-box">
                  <input type="text" className="form-control bg-light border-light" placeholder="Search here..." />
                  <i className="ri-search-2-line search-icon"></i>
                </div>

              </div>

              <SimpleBar id="scrollbar" className="chat-room-list">
                <div className="d-flex align-items-center px-4 mb-2">
                  <div className="flex-grow-1">
                    <h4 className="mb-0 fs-11 text-muted text-uppercase">Direct Messages</h4>
                  </div>
                  <div className="flex-shrink-0">
                    <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="New Message">


                      <button type="button" className="btn btn-soft-info btn-sm">
                        <i className="ri-add-line align-bottom"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="chat-message-list">

                  <ul className="list-unstyled chat-list chat-user-list" id="userList">
                    <li className="active">
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <img src="assets/images/users/avatar-2.jpg" className="rounded-circle img-fluid userprofile" alt="" />
                            </div>
                            <span className="user-status"></span>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Lisa Parker</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="unread-msg-user">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <img src="assets/images/users/avatar-3.jpg" className="rounded-circle img-fluid userprofile" alt="" />
                            </div>
                            <span className="user-status"></span>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Frank Thomas</p>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="badge badge-soft-dark rounded p-1">8</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img away align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <div className="avatar-title rounded-circle bg-danger userprofile">
                                C
                              </div>
                            </div>
                            <span className="user-status"></span>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Clifford Taylor</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <img src="assets/images/users/avatar-4.jpg" className="rounded-circle img-fluid userprofile" alt="" />
                            </div>
                            <span className="user-status"></span>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Janette Caster</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="unread-msg-user">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <img src="assets/images/users/avatar-5.jpg" className="rounded-circle img-fluid userprofile" alt="" />
                            </div>
                            <span className="user-status"></span>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Sarah Beattie</p>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="badge badge-soft-dark rounded p-1">5</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="unread-msg-user">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img away align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <img src="assets/images/users/avatar-6.jpg" className="rounded-circle img-fluid userprofile" alt="" />
                            </div>
                            <span className="user-status"></span>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Nellie Cornett</p>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="badge badge-soft-dark rounded p-1">2</span>
                          </div>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <div className="avatar-title rounded-circle bg-warning userprofile">
                                C
                              </div>
                            </div>
                            <span className="user-status"></span>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Chris Kiernan</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img away align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <div className="avatar-title rounded-circle bg-info userprofile">
                                E
                              </div>
                            </div>
                            <span className="user-status"></span>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Edith Evans</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img away align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <img src="assets/images/users/avatar-7.jpg" className="rounded-circle img-fluid userprofile" alt="" />
                            </div>
                            <span className="user-status"></span>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Joseph Siegel</p>
                          </div>
                        </div>
                      </Link>
                    </li>

                  </ul>
                </div>

                <div className="d-flex align-items-center px-4 mt-4 pt-2 mb-2">
                  <div className="flex-grow-1">
                    <h4 className="mb-0 fs-11 text-muted text-uppercase">Channels</h4>
                  </div>
                  <div className="flex-shrink-0">
                    <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Create group">


                      <button type="button" className="btn btn-soft-info btn-sm">
                        <i className="ri-add-line align-bottom"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="chat-message-list">

                  <ul className="list-unstyled chat-list chat-user-list mb-0" id="channelList">
                    <li>
                      <Link to="#" className="unread-msg-user">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <div className="avatar-title bg-light rounded-circle text-body">
                                #
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Landing Design</p>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="badge badge-soft-dark rounded p-1">7</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <div className="avatar-title bg-light rounded-circle text-body">
                                #
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">General</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="unread-msg-user">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <div className="avatar-title bg-light rounded-circle text-body">
                                #
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Project Tasks</p>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="badge badge-soft-dark rounded p-1">3</span>
                          </div>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <div className="avatar-title bg-light rounded-circle text-dark">
                                #
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Meeting</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <div className="avatar-title bg-light rounded-circle text-dark">
                                #
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">Reporting</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </SimpleBar>
            </div>


            <div className="user-chat w-100 overflow-hidden">

              <div className="chat-content d-lg-flex">

                <div className="w-100 overflow-hidden position-relative">

                  <div className="position-relative">
                    <div className="p-3 user-chat-topbar">
                      <div className="row align-items-center">
                        <div className="col-sm-4 col-8">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 d-block d-lg-none me-3">
                              <Link to="#" className="user-chat-remove fs-18 p-1"><i className="ri-arrow-left-s-line align-bottom"></i></Link>
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                  <img src="assets/images/users/avatar-2.jpg" className="rounded-circle avatar-xs" alt="" />
                                  <span className="user-status"></span>
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                  <h5 className="text-truncate mb-0 fs-16"><Link className="text-reset username" data-bs-toggle="offcanvas" to="#userProfileCanvasExample" aria-controls="userProfileCanvasExample">Lisa Parker</Link> </h5>
                                  <p className="text-truncate text-muted fs-14 mb-0 userStatus"><small>Online</small></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-8 col-4">
                          <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item m-0">
                              <div className="dropdown">
                                <button className="btn btn-ghost-secondary btn-icon" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i data-feather="search" className="icon-sm"></i>
                                </button>
                                <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg">
                                  <div className="p-2">
                                    <div className="search-box">
                                      <input type="text" className="form-control bg-light border-light" placeholder="Search here..." onkeyup="searchMessages()" id="searchMessage" />
                                      <i className="ri-search-2-line search-icon"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li className="list-inline-item d-none d-lg-inline-block m-0">
                              <button type="button" className="btn btn-ghost-secondary btn-icon" data-bs-toggle="offcanvas" data-bs-target="#userProfileCanvasExample" aria-controls="userProfileCanvasExample">
                                <i data-feather="info" className="icon-sm"></i>
                              </button>
                            </li>

                            <li className="list-inline-item m-0">
                              <div className="dropdown">
                                <button className="btn btn-ghost-secondary btn-icon" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i data-feather="more-vertical" className="icon-sm"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item d-block d-lg-none user-profile-show" to="#"><i className="ri-user-2-fill align-bottom text-muted me-2"></i> View Profile</Link>
                                  <Link className="dropdown-item" to="#"><i className="ri-inbox-archive-line align-bottom text-muted me-2"></i> Archive</Link>
                                  <Link className="dropdown-item" to="#"><i className="ri-mic-off-line align-bottom text-muted me-2"></i> Muted</Link>
                                  <Link className="dropdown-item" to="#"><i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i> Delete</Link>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>


                    <div className="position-relative" id="users-chat" >

                      <SimpleBar className="chat-conversation p-3 p-lg-4 " id="chat-conversation">
                        <ul className="list-unstyled chat-conversation-list" id="users-conversation">
                          <li className="chat-list left">
                            <div className="conversation-list">
                              <div className="chat-avatar">
                                <img src="assets/images/users/avatar-2.jpg" alt="" />
                              </div>
                              <div className="user-chat-content">
                                <div className="ctext-wrap">
                                  <div className="ctext-wrap-content">
                                    <p className="mb-0 ctext-content">Good morning 😊</p>
                                  </div>
                                  <div className="dropdown align-self-start message-box-drop">
                                    <Link className="dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i className="ri-more-2-fill"></i>
                                    </Link>
                                    <div className="dropdown-menu">
                                      <Link className="dropdown-item reply-message" to="#"><i className="ri-reply-line me-2 text-muted align-bottom"></i>Reply</Link>
                                      <Link className="dropdown-item" to="#"><i className="ri-share-line me-2 text-muted align-bottom"></i>Forward</Link>
                                      <Link className="dropdown-item copy-message" to="#"><i className="ri-file-copy-line me-2 text-muted align-bottom"></i>Copy</Link>
                                      <Link className="dropdown-item" to="#"><i className="ri-bookmark-line me-2 text-muted align-bottom"></i>Bookmark</Link>
                                      <Link className="dropdown-item delete-item" to="#"><i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>Delete</Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="conversation-name"><small className="text-muted time">09:07 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                              </div>
                            </div>
                          </li>


                          <li className="chat-list right">
                            <div className="conversation-list">
                              <div className="user-chat-content">
                                <div className="ctext-wrap">
                                  <div className="ctext-wrap-content">
                                    <p className="mb-0 ctext-content">Good morning, How are you? What about our next meeting?</p>
                                  </div>
                                  <div className="dropdown align-self-start message-box-drop">
                                    <Link className="dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i className="ri-more-2-fill"></i>
                                    </Link>
                                    <div className="dropdown-menu">
                                      <Link className="dropdown-item reply-message" to="#"><i className="ri-reply-line me-2 text-muted align-bottom"></i>Reply</Link>
                                      <Link className="dropdown-item" to="#"><i className="ri-share-line me-2 text-muted align-bottom"></i>Forward</Link>
                                      <Link className="dropdown-item copy-message" to="#"><i className="ri-file-copy-line me-2 text-muted align-bottom"></i>Copy</Link>
                                      <Link className="dropdown-item" to="#"><i className="ri-bookmark-line me-2 text-muted align-bottom"></i>Bookmark</Link>
                                      <Link className="dropdown-item delete-item" to="#"><i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>Delete</Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="conversation-name"><small className="text-muted time">09:08 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                              </div>
                            </div>
                          </li>


                          <li className="chat-list left">
                            <div className="conversation-list">
                              <div className="chat-avatar">
                                <img src="assets/images/users/avatar-2.jpg" alt="" />
                              </div>
                              <div className="user-chat-content">
                                <div className="ctext-wrap">
                                  <div className="ctext-wrap-content">
                                    <p className="mb-0 ctext-content">Yeah everything is fine. Our next meeting tomorrow at 10.00 AM</p>
                                  </div>
                                  <div className="dropdown align-self-start message-box-drop">
                                    <Link className="dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i className="ri-more-2-fill"></i>
                                    </Link>
                                    <div className="dropdown-menu">
                                      <Link className="dropdown-item reply-message" to="#"><i className="ri-reply-line me-2 text-muted align-bottom"></i>Reply</Link>
                                      <Link className="dropdown-item" to="#"><i className="ri-share-line me-2 text-muted align-bottom"></i>Forward</Link>
                                      <Link className="dropdown-item copy-message" to="#"><i className="ri-file-copy-line me-2 text-muted align-bottom"></i>Copy</Link>
                                      <Link className="dropdown-item" to="#"><i className="ri-bookmark-line me-2 text-muted align-bottom"></i>Bookmark</Link>
                                      <Link className="dropdown-item delete-item" to="#"><i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>Delete</Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="ctext-wrap">
                                  <div className="ctext-wrap-content">
                                    <p className="mb-0 ctext-content">Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.</p>
                                  </div>
                                  <div className="dropdown align-self-start message-box-drop">
                                    <Link className="dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i className="ri-more-2-fill"></i>
                                    </Link>
                                    <div className="dropdown-menu">
                                      <Link className="dropdown-item reply-message" to="#"><i className="ri-reply-line me-2 text-muted align-bottom"></i>Reply</Link>
                                      <Link className="dropdown-item" to="#"><i className="ri-share-line me-2 text-muted align-bottom"></i>Forward</Link>
                                      <Link className="dropdown-item copy-message" to="#"><i className="ri-file-copy-line me-2 text-muted align-bottom"></i>Copy</Link>
                                      <Link className="dropdown-item" to="#"><i className="ri-bookmark-line me-2 text-muted align-bottom"></i>Bookmark</Link>
                                      <Link className="dropdown-item delete-item" to="#"><i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>Delete</Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="conversation-name"><small className="text-muted time">09:10 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                              </div>
                            </div>
                          </li>


                          <li className="chat-list right">
                            <div className="conversation-list">
                              <div className="user-chat-content">
                                <div className="ctext-wrap">
                                  <div className="ctext-wrap-content">
                                    <p className="mb-0 ctext-content">Wow that's great</p>
                                  </div>
                                  <div className="dropdown align-self-start message-box-drop">
                                    <Link className="dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i className="ri-more-2-fill"></i>
                                    </Link>
                                    <div className="dropdown-menu">
                                      <Link className="dropdown-item reply-message" to="#"><i className="ri-reply-line me-2 text-muted align-bottom"></i>Reply</Link>
                                      <Link className="dropdown-item" to="#"><i className="ri-share-line me-2 text-muted align-bottom"></i>Forward</Link>
                                      <Link className="dropdown-item copy-message" to="#"><i className="ri-file-copy-line me-2 text-muted align-bottom"></i>Copy</Link>
                                      <Link className="dropdown-item" to="#"><i className="ri-bookmark-line me-2 text-muted align-bottom"></i>Bookmark</Link>
                                      <Link className="dropdown-item delete-item" to="#"><i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>Delete</Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="conversation-name"><small className="text-muted time">09:12 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                              </div>
                            </div>
                          </li>


                          <li className="chat-list left">
                            <div className="conversation-list">
                              <div className="chat-avatar">
                                <img src="assets/images/users/avatar-2.jpg" alt="" />
                              </div>
                              <div className="user-chat-content">
                                <div className="ctext-wrap">
                                  <div className="message-img mb-0">
                                    <div className="message-img-list">
                                      <div>
                                        <Link className="popup-img d-inline-block" to="assets/images/small/img-1.jpg">
                                          <img src="assets/images/small/img-1.jpg" alt="" className="rounded border" />
                                        </Link>
                                      </div>
                                      <div className="message-img-link">
                                        <ul className="list-inline mb-0">
                                          <li className="list-inline-item dropdown">
                                            <Link className="dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                              <i className="ri-more-fill"></i>
                                            </Link>
                                            <div className="dropdown-menu">
                                              <Link className="dropdown-item" to="assets/images/small/img-1.jpg" download=""><i className="ri-download-2-line me-2 text-muted align-bottom"></i>Download</Link>
                                              <Link className="dropdown-item" to="#"><i className="ri-reply-line me-2 text-muted align-bottom"></i>Reply</Link>
                                              <Link className="dropdown-item" to="#"><i className="ri-share-line me-2 text-muted align-bottom"></i>Forward</Link>
                                              <Link className="dropdown-item" to="#"><i className="ri-bookmark-line me-2 text-muted align-bottom"></i>Bookmark</Link>
                                              <Link className="dropdown-item delete-image" to="#"><i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>Delete</Link>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>

                                    <div className="message-img-list">
                                      <div>
                                        <Link className="popup-img d-inline-block" to="assets/images/small/img-2.jpg">
                                          <img src="assets/images/small/img-2.jpg" alt="" className="rounded border" />
                                        </Link>
                                      </div>
                                      <div className="message-img-link">
                                        <ul className="list-inline mb-0">
                                          <li className="list-inline-item dropdown">
                                            <Link className="dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                              <i className="ri-more-fill"></i>
                                            </Link>
                                            <div className="dropdown-menu">
                                              <Link className="dropdown-item" to="assets/images/small/img-2.jpg" download=""><i className="ri-download-2-line me-2 text-muted align-bottom"></i>Download</Link>
                                              <Link className="dropdown-item" to="#"><i className="ri-reply-line me-2 text-muted align-bottom"></i>Reply</Link>
                                              <Link className="dropdown-item" to="#"><i className="ri-share-line me-2 text-muted align-bottom"></i>Forward</Link>
                                              <Link className="dropdown-item" to="#"><i className="ri-bookmark-line me-2 text-muted align-bottom"></i>Bookmark</Link>
                                              <Link className="dropdown-item delete-image" to="#"><i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>Delete</Link>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="conversation-name"><small className="text-muted time">09:30 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                              </div>
                            </div>
                          </li>

                        </ul>
                      </SimpleBar>

                      <div className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show " id="copyClipBoard" role="alert">
                        Message copied
                      </div>
                    </div>



                    <div className="chat-input-section p-3 p-lg-4">

                      <form id="chatinput-form" enctype="multipart/form-data" >
                        <div className="row g-0 align-items-center">
                          <div className="col-auto">
                            <div className="chat-input-links me-2">
                              <div className="links-list-item">
                                <button type="button" className="btn btn-link text-decoration-none emoji-btn" id="emoji-btn">
                                  <i className="bx bx-smile align-middle"></i>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="col">
                            <div className="chat-input-feedback">
                              Please Enter a Message
                            </div>
                            <input type="text" className="form-control chat-input bg-light border-light" id="chat-input" placeholder="Type your message..." autocomplete="off" />
                          </div>
                          <div className="col-auto">
                            <div className="chat-input-links ms-2">
                              <div className="links-list-item">
                                <button type="submit" className="btn btn-info chat-send waves-effect waves-light">
                                  <i className="ri-send-plane-2-fill align-bottom"></i>
                                </button>
                              </div>
                            </div>
                          </div>

                        </div>
                      </form>
                    </div>

                    <div className="replyCard">
                      <div className="card mb-0">
                        <div className="card-body py-3">
                          <div className="replymessage-block mb-0 d-flex align-items-start">
                            <div className="flex-grow-1">
                              <h5 className="conversation-name"></h5>
                              <p className="mb-0"></p>
                            </div>
                            <div className="flex-shrink-0">
                              <button type="button" id="close_toggle" className="btn btn-sm btn-link mt-n2 me-n3 fs-18">
                                <i className="bx bx-x align-middle"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Chats;
