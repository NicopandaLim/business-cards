import { TestBed } from '@angular/core/testing';

import { TakepictureService } from './takepicture.service';

describe('TakepictureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TakepictureService = TestBed.get(TakepictureService);
    expect(service).toBeTruthy();
  });
});
