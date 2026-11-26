# Builds the /work tile covers (WebP, 16:9) from the real product imagery in the repo.
import os, subprocess, sys
from PIL import Image, ImageChops, ImageDraw
ROOT='/Users/pc/Downloads/Pari/portfolio-site-work'
P=ROOT+'/artifacts/portfolio/public'; OUT=P+'/work'; A=ROOT+'/attached_assets'
FF='/Users/pc/Downloads/Pari/portfolio-videos/node_modules/@remotion/compositor-darwin-x64'
ENV=dict(os.environ, DYLD_LIBRARY_PATH=FF)
os.makedirs(OUT,exist_ok=True); os.makedirs('fr',exist_ok=True)
def save(im, slug, big=False):
    im=im.convert('RGB')
    for w in ([480,960,1600] if big else [480,960]):
        if w>960 and im.width<1200: continue
        im.resize((w,w*9//16),Image.LANCZOS).save(f'{OUT}/{slug}-{w}.webp',quality=80,method=6)
def fit169(im, box=None, top=True):
    if box: im=im.crop(box)
    w,h=im.size
    if w*9>h*16: nw=h*16//9; x=(w-nw)//2; return im.crop((x,0,x+nw,h))
    nh=w*9//16; y=0 if top else (h-nh)//2; return im.crop((0,y,w,y+nh))
def frame(src,t,name):
    out=f'fr/{name}.png'
    subprocess.run([FF+'/ffmpeg','-v','error','-y','-ss',str(t),'-i',src,'-frames:v','1',out],env=ENV,check=True)
    return Image.open(out).convert('RGB')
only=sys.argv[1:] 
def want(k): return not only or k in only
if want('web'):
    for f in sorted(os.listdir(P+'/webprojects')):
        save(fit169(Image.open(f'{P}/webprojects/{f}')), 'web-'+f[3:-4], big=True)
if want('web3'):
    for f in sorted(os.listdir(P+'/web3')):
        im=Image.open(f'{P}/web3/{f}').convert('RGB'); W,H=im.size
        bg=Image.new('RGB',im.size,im.getpixel((6,H//2)))
        d=ImageChops.difference(im,bg).convert('L').point(lambda v:255 if v>14 else 0)
        d.paste(0,(0,0,W,90))
        x0,y0,x1,y1=d.getbbox()
        cw=max(x1-x0, (y1-y0)*16/9)*1.07; cw=min(max(cw,960),W); ch=cw*9/16
        cx=(x0+x1)/2; cy=(y0+y1)/2
        x=min(max(cx-cw/2,0),W-cw); y=min(max(cy-ch/2,0),H-ch)
        save(im.crop((int(x),int(y),int(x+cw),int(y+ch))), 'web3-'+f[3:-4])
if want('roblox'):
    for f in sorted(os.listdir(P+'/roblox')):
        save(fit169(Image.open(f'{P}/roblox/{f}')), 'roblox-'+f[3:-4])
if want('shorts'):
    for n,t,y in [('hair-colour-story',4,150),('body-secret-army',16,180),('molasses-flood',24,100),('three-am-knock',10,250),('hug-swap-story',4,300)]:
        im=frame(f'{P}/videos/games/{n}.mp4',t,'short-'+n)
        save(im.crop((0,y,720,y+405)),'short-'+n)
if want('films'):
    for n,t,box in [('accessibility-audit',20,(200,170,1300,789)),('proposal-generator',20,(880,250,1840,790)),('cross-platform-agent',12,(900,230,1860,770))]:
        im=frame(f'{P}/videos/films/{n}.mp4',t,'film-'+n)
        save(im.crop(box),'film-'+n)
if want('entsorger'):
    save(fit169(Image.open(A+'/entsorger_showcase.png'),top=False),'entsorger-circle',big=True)
if want('cashout'):
    SRC='/Users/pc/Downloads/Cashout-AI-chat-screen-recording.mp4'
    W,H=1600,900
    def phone(im,w):
        im=im.resize((w,int(im.height*w/im.width)),Image.LANCZOS)
        m=Image.new('L',im.size,0); ImageDraw.Draw(m).rounded_rectangle((0,0,im.width,im.height+80),36,fill=255)
        return im,m
    def compose(left,right,scale=1.0):
        c=Image.new('RGB',(W,H),(0,21,212))
        for im,x,y in ((left,60,70),(right,820,150)):
            ph,m=phone(im,720)
            sh=Image.new('RGB',ph.size,(0,12,150)); c.paste(sh,(x+14,y+16),m); c.paste(ph,(x,y),m)
        return c
    right=frame(SRC,31,'cash-right')
    save(compose(frame(SRC,25,'cash-left'),right),'cashout-ai-property-platform',big=True)
    # hover loop: the left phone plays the recording, question to results
    os.makedirs('fr/cashloop',exist_ok=True)
    subprocess.run([FF+'/ffmpeg','-v','error','-y','-ss','10','-t','17','-i',SRC,'-r','12','fr/cashloop/s-%04d.png'],env=ENV,check=True)
    fs=sorted(f for f in os.listdir('fr/cashloop') if f.startswith('s-'))
    for i,f in enumerate(fs):
        compose(Image.open('fr/cashloop/'+f).convert('RGB'),right).resize((960,540),Image.LANCZOS).save(f'fr/cashloop/c-{i:04d}.png')
    os.makedirs(P+'/videos/work',exist_ok=True)
    subprocess.run([FF+'/ffmpeg','-v','error','-y','-r','12','-i','fr/cashloop/c-%04d.png','-c:v','libx264','-pix_fmt','yuv420p','-crf','27','-preset','slow','-movflags','+faststart','-an',P+'/videos/work/cashout-ai-property-platform.mp4'],env=ENV,check=True)
print('ok')
