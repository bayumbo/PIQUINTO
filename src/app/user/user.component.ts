import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router, private service: AuthService, private dialog: MatDialog) {
    this.LoadUser();
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }
  LoadUser() {
    this.service.Getall().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];

  updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }

  deleteuser(id:any){
    this.service.deleteuser(id).subscribe(a=>{this.toastr.success('Usuario Eliminado.')
    //this.router.navigate(['panel'])
    window.location.reload()
  });
}

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }

 // exportExcel(){
 //   const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//const EXCEL_EXTENSION = '.xlsx';
//    const worksheet = XLSX.utils.json_to_sheet(this.userlist);
  //  const workbook = {
 //     Sheets:{
//'testingSheet': worksheet
 //     },
 //     SheetNames: ['testingSheet']
 //   }
 //   const excelBuffer= XLSX.write(workbook,{bookType:'xlsx',type:'array'})
 //   const blobData= new Blob([excelBuffer],{type:EXCEL_TYPE})
 //   this.fileSaver.save(blobData,"demoField")

//}


}
