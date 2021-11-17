import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faClock, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faReply, faTrashAlt, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-thread-block',
  templateUrl: './forum-thread-block.component.html',
  styleUrls: ['./forum-thread-block.component.css']
})
export class ForumThreadBlockComponent implements OnInit {
  //fontAwesome icons
  faReply = faReply;
  faClock = faClock;
  faCommentDots = faCommentDots;
  faEdit = faEdit;
  faDelete = faTrashAlt;
  faUserSlash = faUserSlash;

  @Input() replies$: any;
  @Input() index: any;
  @Input() p: any;
  @Output() quotedReply = new EventEmitter<any>();
  //@Output() replyToEdit = new EventEmitter<any>();

  from$: any[];
  to$: any[];
  toBan: any;
  topicID: any;
  threadID: any;
  currentUserID: any;
  replyToDelete: any;
  fromReplyToDelete: any;
  replyToEdit: any;
  firstReply: any;

  //pagination
  page = 1;
  itemsPerPage = 10;
  lastPage: any;

  isAdmin = false;
  editClicked = false;

  constructor(private route: ActivatedRoute, public topicService: TopicService, public authService: AuthService) {
    this.topicID = 'YFb7yHbbsy0EfujSESXV' //(for test purposes) -- general discussion topicID
    this.threadID = this.route.snapshot.paramMap.get('id');
    this.currentUserID = JSON.parse(localStorage.getItem('user') || '').uid;

    this.to$ = [];
    this.from$ = [];
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin;
    this.replyToDelete = {
      replyID: '',
      message: ''
    };

    this.toBan = {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      isBanned: false,
    };

    this.fromReplyToDelete = '';
  }

  ngOnChanges(): void {
    //get id of the reply that started the thread
    this.firstReply = this.replies$[0]?.replyID;

    //set page
    this.page = this.p;
    //get value of last page
    this.lastPage = Math.floor((this.replies$.length / this.itemsPerPage) + 1);

    //get complete reply details for each reply
    this.replies$.forEach((element: any, index: number) => {
      //get detail of user replying
      this.authService.getSingleUser(element.from).subscribe(result => {
        const fromInfo = {
          uid: result.get('uid'),
          displayName: result.get('displayName'),
          email: result.get('email'),
          photoURL: result.get('photoURL'),
          isBanned: result.get('isBanned'),
          isAdmin: result.get('isAdmin')
        }
        this.from$[index] = fromInfo;
      })

      //if user is replying to another user
      if (element.to) {
        //get detail of user being replied to
        this.authService.getSingleUser(element.to).subscribe(result => {
          //get message
          this.topicService.getSingleReply(this.topicID, this.threadID, element.toReplyID).subscribe(reply => {
            const toInfo = {
              uid: result.get('uid'),
              displayName: result.get('displayName'),
              message: reply.get('message'),
              datePosted: reply.get('datePosted'),
              isBanned: result.get('isBanned')
            }
            this.to$[index] = toInfo;
          })
        })
      }

      //set index adjacent to replies$ to blank if user is not replying to anyone
      else {
        this.to$[index] = '';
      }
    });
  }

  //output index of the specific reply that user wants to quote and reply to
  onReply(i: number) {
    this.quotedReply.emit(i);
  }

  //delete button is clicked, get replyToDelete and display name of replyToDelete
  onDelete(reply: any, from: any) {
    this.replyToDelete = reply;
    this.fromReplyToDelete = from;
  }

  //if deleted reply is the only reply on the page, jump to previous page.
  onDeleteSuccess() {
    const currentLength = this.replies$.length - 1;
    if (currentLength % this.itemsPerPage === 0) {
      this.p = this.lastPage - 1;
    }
  }

  //edit button is clicked, get replyToEdit
  onEdit(reply: any) {
    this.editClicked = true;
    this.replyToEdit = reply;
  }

  //edit is aborted, clear replyToEdit
  onEditClose(close: boolean) {
    this.replyToEdit = null;
    this.editClicked = false;
  }

  //ban link is clicked
  onBan(id: any, from: any) {
    this.toBan = {
      uid: id,
      email: from.email,
      displayName: from.displayName,
      photoURL: from.photoURL,
      isBanned: from.isBanned,
    };
  }

  //if ban successful
  onBanSuccess(uid: any) {
    this.toBan.isBanned = null;

    //update ban icon in every cell the user appears
    this.from$.forEach((result: any) => {
      if(result.uid === uid) {
        result.isBanned = !result.isBanned;
      }
    })

    this.to$.forEach((result: any) => {
      if(result.uid == uid) {
        result.isBanned = !result.isBanned;
      }
    })
  }
}
