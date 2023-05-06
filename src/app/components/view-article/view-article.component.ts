import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";

import { ProfileService } from "src/app/services/profile.service";
import { Profile } from "src/app/models/Profile";

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit, OnDestroy {
  profiles: Profile[] = [];
  private profileSubscription!: Subscription;

  constructor(private profilesService: ProfileService) {}

  ngOnInit(): void {
    this.profilesService.getProfiles();
    this.profileSubscription = this.profilesService
      .getProfilesStream()
      .subscribe((profiles: Profile[]) => {
        this.profiles = profiles;
      });
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }

  onDelete(profileId: string) {
    const result = confirm("Are you sure you want to delete this profile?");
    if (result) {
      this.profilesService.deleteProfile(profileId);
    }
  }
}
